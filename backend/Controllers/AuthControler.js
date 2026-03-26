import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import userModels from "../Models/user.js";
import { Session } from "../Models/SessionModal.js";

// ✅ SIGNUP
export const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await userModels.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        message: "User already exists",
        success: false
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new userModels({
      name,
      email,
      password: hashedPassword,
      isVerified: true
    });

    await newUser.save();
    return res.status(201).json({
      message: "Signup successful",
      success: true
    });

  } catch (error) {
    console.error("Signup error:", error);
    return res.status(500).json({
      message: "Internal server error",
      success: false
    });
  }
};

// ✅ LOGIN
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModels.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Invalid email or password"
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password"
      });
    }

    const accessToken = jwt.sign({ id: user._id }, process.env.JWT_ACCESS_SECRET, { expiresIn: "15m" });
    const refreshToken = jwt.sign({ id: user._id }, process.env.JWT_REFRESH_SECRET, { expiresIn: "7d" });

    await Session.deleteMany({ userId: user._id });
    await Session.create({ userId: user._id, refreshToken });

    user.isLoggedIn = true;
    await user.save();

    return res.status(200).json({
      success: true,
      message: `Welcome ${user.email}`,
      accessToken,
      refreshToken
    });

  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
};

// ✅ LOGOUT
export const logoutUser = async (req, res) => {
  try {
    await Session.deleteMany({ userId: req.userId });
    await userModels.findByIdAndUpdate(req.userId, { isLoggedIn: false });
    return res.json({ success: true, message: "Logout successful" });
  } catch {
    return res.status(500).json({ success: false });
  }
};

// ✅ FORGOT PASSWORD
export const forgotpassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await userModels.findOne({ email });
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    user.otp = otp;
    user.otpExpiry = new Date(Date.now() + 10 * 60 * 1000);
    await user.save();

    console.log("OTP:", otp);
    return res.status(200).json({ success: true, message: "OTP generated (check console)" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ VERIFY OTP
export const verifyOTP = async (req, res) => {
  const { email, otp } = req.body;
  try {
    const user = await userModels.findOne({ email });
    if (!user || user.otp !== otp) {
      return res.status(400).json({ success: false, message: "Invalid OTP" });
    }
    if (user.otpExpiry < new Date()) {
      return res.status(400).json({ success: false, message: "OTP expired" });
    }

    user.otp = null;
    user.otpExpiry = null;
    await user.save();
    return res.status(200).json({ success: true, message: "OTP verified" });
  } catch {
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

// ✅ CHANGE PASSWORD
export const changePassword = async (req, res) => {
  const { email, newPassword, confirmPassword } = req.body;

  if (newPassword !== confirmPassword) {
    return res.status(400).json({ success: false, message: "Passwords do not match" });
  }

  try {
    const user = await userModels.findOne({ email });
    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();
    return res.status(200).json({ success: true, message: "Password changed" });
  } catch {
    return res.status(500).json({ success: false, message: "Server error" });
  }
};