export interface CheckEmailResult {
  exists: boolean;
  user?: {
    idAsipiya_User: number;
    First_Name: string;
    Last_Name: string;
    Contact_No_01: string;
  };
}

export interface StoreCompanyAndUserPayload {
  First_Name?: string;
  Last_Name?: string;
  Email: string;
  Contact_No_01: string;
  Password?: string;
  Name: string; // Company Name
  Address: string;
  Company_Email?: string;
  Company_Website?: string;
  Company_Category_idCompany_Category?: number;
  Asipiya_Softwares_idAsipiya_Softwares?: number;
}

export interface StoreCompanyAndUserResult {
  message: string;
  userCreated: boolean;
  companyId: number;
  userId: number;
  branchId: number;
  extraSetup: any;
}
