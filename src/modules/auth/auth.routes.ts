import { Router } from "express";
import { checkEmail, storeCompanyAndUser } from "./auth.controller";

const router = Router();

router.get("/check-email", checkEmail);
router.post("/store-company-user", storeCompanyAndUser);

export default router;
