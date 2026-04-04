import express from "express";
import { signup, login, verifcation,logoutUser, forgotpassword, verifyOTP, chnagePassword} from "../Controllers/AuthControler.js";

import { authMiddleware, signupValidation } from "../Middlewares/AuthValidation.js";

const router = express.Router();

router.get("/check", (req, res) => {
  res.send("Auth route working ✅");
});

router.post("/signup", signupValidation, signup);
router.post("/login", login);
router.get("/verify", verifcation);
router.post("/logout", authMiddleware, logoutUser);
router.post("/forgot-password",forgotpassword)
router.post("/verify-otp",verifyOTP)
router.post("/change-password",chnagePassword)
export default router;

