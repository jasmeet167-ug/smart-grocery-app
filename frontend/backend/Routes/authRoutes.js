import express from "express";
import { signup, login, forgotpassword, verifyOTP, changePassword } 
from "../Controllers/AuthControler.js";

import { authMiddleware, signupValidation } from "../Middlewares/AuthValidation.js";

const router = express.Router();

router.get("/check", (req, res) => {
  res.send("Auth route working ✅");
});

router.post("/signup", signupValidation, signup);
router.post("/login", login);
router.post("/forgot-password", forgotpassword);
router.post("/verify-otp", verifyOTP);
router.post("/change-password", changePassword);

export default router;