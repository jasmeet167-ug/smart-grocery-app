import express from "express";
import { signup, login, logoutUser, forgotpassword, verifyOTP, changePassword } from "../Controllers/AuthControler.js";
import { signupValidation, authMiddleware } from "../Middlewares/AuthValidation.js";

const router = express.Router();

router.post("/signup", signupValidation, signup);
router.post("/login", login);
router.post("/logout", authMiddleware, logoutUser);
router.post("/forgot-password", forgotpassword);
router.post("/verify-otp", verifyOTP);
router.post("/change-password", changePassword);

export default router;