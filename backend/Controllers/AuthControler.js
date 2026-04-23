import userModels from "../Models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { sendMail } from "../emilVerify/sendMail.js";
import { Session } from "../Models/SessionModal.js";


// ================= SIGNUP =================
export const signup = async (req, res) => {
  try {
    const { email, password } = req.body;

    const existingUser = await userModels.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        message: "User already exists",
        success: false,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new userModels({
      email,
      password: hashedPassword,
      isVerified: true   // ✅ direct allow
    });

    await newUser.save();

    return res.status(201).json({
      message: "Signup successful",
      success: true,
    });

  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};


// ================= LOGIN =================
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

    // ❌ WRONG PASSWORD → OTP FLOW
    if (!isMatch) {

      const otp = Math.floor(100000 + Math.random() * 900000).toString();
      const expiry = new Date(Date.now() + 10 * 60 * 1000);

      user.otp = otp;
      user.otpExpiry = expiry;
      await user.save();

      try {
        await sendMail(email, otp); // real email → OTP jayega
      } catch (err) {
        console.log("Mail failed (fake email)");
      }

      return res.status(401).json({
        success: false,
        message: "Wrong password. OTP sent if email exists"
      });
    }

    // ✅ LOGIN SUCCESS
    const accessToken = jwt.sign(
      { id: user._id },
      process.env.JWT_ACCESS_SECRET,
      { expiresIn: "15m" }
    );

    const refreshToken = jwt.sign(
      { id: user._id },
      process.env.JWT_REFRESH_SECRET,
      { expiresIn: "7d" }
    );

    await Session.deleteMany({ userId: user._id });

    await Session.create({
      userId: user._id,
      refreshToken
    });

    user.isLoggedIn = true;
    await user.save();

    return res.status(200).json({
      success: true,
      message: `Welcome ${user.email}`,
      accessToken,
      refreshToken
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
};


// ================= VERIFY OTP =================
export const verifyOTP = async (req, res) => {
  const { email, otp } = req.body;

  if (!email || !otp) {
    return res.status(400).json({
      success: false,
      message: "Email and OTP required"
    });
  }

  try {
    const user = await userModels.findOne({ email });

    if (!user || !user.otp) {
      return res.status(400).json({
        success: false,
        message: "Invalid request"
      });
    }

    if (user.otpExpiry < new Date()) {
      return res.status(400).json({
        success: false,
        message: "OTP expired"
      });
    }

    if (otp !== user.otp) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP"
      });
    }

    user.otp = null;
    user.otpExpiry = null;
    await user.save();

    return res.status(200).json({
      success: true,
      message: "OTP verified"
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};


// ================= FORGOT PASSWORD =================
export const forgotpassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await userModels.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiry = new Date(Date.now() + 10 * 60 * 1000);

    user.otp = otp;
    user.otpExpiry = expiry;
    await user.save();

    await sendMail(email, otp);

    return res.status(200).json({
      success: true,
      message: "OTP sent"
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};


// ================= CHANGE PASSWORD =================
export const changePassword = async (req, res) => {
  const { email, newPassword, confirmPassword } = req.body;

  if (!email || !newPassword || !confirmPassword) {
    return res.status(400).json({
      success: false,
      message: "All fields required"
    });
  }

  if (newPassword !== confirmPassword) {
    return res.status(400).json({
      success: false,
      message: "Passwords do not match"
    });
  }

  try {
    const user = await userModels.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Password updated"
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};