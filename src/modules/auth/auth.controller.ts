import { Request, Response } from "express";
import { AuthService } from "./auth.service";
import { StoreCompanyAndUserPayload } from "./auth.types";

export const checkEmail = async (req: Request, res: Response) => {
  let { email } = req.query;
  if (!email) return res.status(400).json({ message: "Email is required" });

  try {
    const result = await AuthService.checkEmail(String(email));
    return res.status(200).json(result);
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
    Password,
    Name,
    Address,
    Company_Email,
    Company_Website,
    Company_Category_idCompany_Category,
    Asipiya_Softwares_idAsipiya_Softwares,
  } = req.body;

  if (!Email || !Name || !Address || !Contact_No_01) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  const payload: StoreCompanyAndUserPayload = {
    First_Name,
    Last_Name,
    Email,
    Contact_No_01,
    Password,
    Name, // Company name
    Address,
    Company_Email,
    Company_Website,
    Company_Category_idCompany_Category,
    Asipiya_Softwares_idAsipiya_Softwares,
  };

  try {
    const result = await AuthService.storeCompanyAndUser(payload);
    return res.status(200).json(result);
  } catch (error: any) {
    console.error("storeCompanyAndUser error:", error);
    if (error.message === "Password is required for new users") {
      return res.status(400).json({ message: error.message });
    }
    return res.status(500).json({ message: "Internal server error" });
  }
};
