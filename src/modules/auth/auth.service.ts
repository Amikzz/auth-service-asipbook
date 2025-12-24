import prisma from "../../utils/prisma";
import bcrypt from "bcrypt";
import {
  CheckEmailResult,
  StoreCompanyAndUserPayload,
  StoreCompanyAndUserResult,
} from "./auth.types";
// import axiosClient from "../../utils/axiosClient"; // Keep if needed for future use

export class AuthService {
  static async checkEmail(email: string): Promise<CheckEmailResult> {
    const normalizedEmail = email.trim().toLowerCase();

    const user = await prisma.user.findFirst({
      where: {
        email: normalizedEmail,
        isActive: true,
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        contactNo1: true,
      },
    });

    if (!user) {
      return { exists: false };
    }

    return {
      exists: true,
      user: {
        idAsipiya_User: user.id,
        First_Name: user.firstName || "",
        Last_Name: user.lastName || "",
        Contact_No_01: user.contactNo1 || "",
      },
    };
  }

  static async storeCompanyAndUser(
    payload: StoreCompanyAndUserPayload
  ): Promise<StoreCompanyAndUserResult> {
    const {
      First_Name,
      Last_Name,
      Email,
      Contact_No_01,
      Password,
      Name,
      Address,
      Company_Email,
      Company_Website,
      Company_Category_idCompany_Category,
    } = payload;

    const normalizedEmail = String(Email).trim().toLowerCase();

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
        throw new Error("Password is required for new users");
      }

      const hashedPassword = await bcrypt.hash(Password, 10);

      const newUser = await prisma.user.create({
        data: {
          firstName: First_Name || "",
          lastName: Last_Name || "",
          email: normalizedEmail,
          password: hashedPassword,
          contactNo1: Contact_No_01,
          isActive: true,
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
    const createdDate = new Date().toISOString().split("T")[0];

    // Link User <-> Company
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

    // Optional: Call external user registration if needed (commented out in original)
    if (userCreated) {
      /*
      try {
        const registerPayload = {
           // ... payload construction
        };
        // const registerResponse = await axiosClient.post("/user/register", registerPayload);
        // extraSetup = registerResponse.data;
      } catch (err) {
        console.warn("Project B bootstrap failed:", err);
      }
      */
    }

    return {
      message: userCreated
        ? "New user, company and branch created."
        : "Existing user detected. New company and branch created and linked.",
      userCreated,
      companyId,
      userId: userId!,
      branchId,
      extraSetup,
    };
  }
}
