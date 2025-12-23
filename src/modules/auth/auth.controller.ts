import { Request, Response } from "express";
import bcrypt from "bcrypt";
import prisma from "../../utils/prisma";
import axiosClient from "../../utils/axiosClient";

export const checkEmail = async (req: Request, res: Response) => {
  let { email } = req.query;
  if (!email) return res.status(400).json({ message: "Email is required" });

  try {
    const normalizedEmail = String(email).trim().toLowerCase();

    // Pull a few basic fields to hydrate the UI if the email exists
    const user = await prisma.user.findFirst({
      where: {
        email: normalizedEmail,
        isActive: true, // Assuming Status='1' maps to isActive=true
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        contactNo1: true,
      },
    });

    if (!user) {
      return res.status(200).json({ exists: false });
    }

    return res.status(200).json({
      exists: true,
      user: {
        idAsipiya_User: user.id,
        First_Name: user.firstName || "",
        Last_Name: user.lastName || "",
        Contact_No_01: user.contactNo1 || "",
      },
    });
  } catch (err) {
    console.error("checkEmail error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

export const storeCompanyAndUser = async (req: Request, res: Response) => {
  const {
    First_Name,
    Last_Name,
    Email,
    Contact_No_01,
    Password, // optional if Email already exists
    Name, // Company name
    Address,
    Company_Email,
    Company_Website,
    Company_Category_idCompany_Category,
    Asipiya_Softwares_idAsipiya_Softwares, // reserved
  } = req.body;

  if (!Email || !Name || !Address || !Contact_No_01) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  const normalizedEmail = String(Email).trim().toLowerCase();

  try {
    // Check if user exists
    const existingUser = await prisma.user.findFirst({
      where: {
        email: normalizedEmail,
        isActive: true,
      },
      select: { id: true },
    });

    let userId: number | null = null;
    let userCreated = false;

    if (existingUser) {
      userId = existingUser.id;
    } else {
      if (!Password) {
        return res
          .status(400)
          .json({ message: "Password is required for new users" });
      }

      const hashedPassword = await bcrypt.hash(Password, 10);

      // Create user
      const newUser = await prisma.user.create({
        data: {
          firstName: First_Name || "",
          lastName: Last_Name || "",
          email: normalizedEmail,
          password: hashedPassword,
          contactNo1: Contact_No_01,
          isActive: true,
          // Generated ID is nullable/optional initially, updated after ID is known
        },
      });

      userId = newUser.id;
      const nextGenId = 4000 + userId;

      await prisma.user.update({
        where: { id: userId },
        data: { generatedId: nextGenId },
      });

      userCreated = true;
    }

    // Create Company
    const newCompany = await prisma.company.create({
      data: {
        name: Name,
        address: Address,
        status: "1",
        companyCategoryId: Company_Category_idCompany_Category || null,
        companyEmail: Company_Email || normalizedEmail,
        companyWebsite: Company_Website || null,
      },
    });

    const companyId = newCompany.idCompany;

    // Link User <-> Company
    const createdDate = new Date().toISOString().split("T")[0];

    await prisma.companyHasUser.create({
      data: {
        companyId: companyId,
        userId: userId!,
        role: "Owner",
        createdDate: createdDate,
        status: "1",
      },
    });

    // Create Default Branch
    const branchName = "Main Branch";
    const newBranch = await prisma.branch.create({
      data: {
        name: branchName,
        email: Company_Email || normalizedEmail,
        companyId: companyId,
        registeredDate: createdDate,
        address: Address,
        contactNo: Contact_No_01,
        status: "1",
      },
    });

    const branchId = newBranch.idBranch;

    let extraSetup = null;
    if (userCreated) {
      try {
        const registerPayload = {
          Password, // plaintext
          Email: normalizedEmail,
          Branch_idBranch: branchId,
          Title: "Mr.",
          First_Name: First_Name || "",
          Last_Name: Last_Name || "",
          Contact_No_01,
          Contact_No_02: "",
          Country: "",
          State: "",
          District: "",
          City: "",
          Street_Address: Address,
          insertedUserId: userId,
        };

        // const registerResponse = await axiosClient.post(
        //   "/user/register",
        //   registerPayload
        // );

        // if (registerResponse.status === 200) {
        //   extraSetup = registerResponse.data || null;
        // }
      } catch (err: any) {
        console.warn("Project B bootstrap failed:", err?.message || err);
      }
    }

    return res.status(200).json({
      message: userCreated
        ? "New user, company and branch created."
        : "Existing user detected. New company and branch created and linked.",
      userCreated,
      companyId,
      userId,
      branchId,
      extraSetup,
    });
  } catch (error) {
    console.error("storeCompanyAndUser error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
