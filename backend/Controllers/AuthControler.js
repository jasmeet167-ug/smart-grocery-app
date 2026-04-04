import userModels from "../Models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { sendMail } from "../emilVerify/sendMail.js";

import { verifyMail } from "../emilVerify/verifyMail.js";
import { Session } from "../Models/SessionModal.js";
//......///
//Singup//
//......///

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
    });

    await newUser.save();

    const token = jwt.sign(
      { id: newUser._id, email: newUser.email },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    await verifyMail(token, email);

    res.status(201).json({
      message: "Signup successful. Verification email sent.",
      success: true,
      token,
    });

  } catch (error) {
    console.error("Signup error:", error);

    res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};
//login//
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

    //  Check verification first//
    if (!user.isVerified) {
      return res.status(403).json({
        success: false,
        message: "Verify your account then login"
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password"
      });
    }

    //  Generate Tokens//
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

    // Remove old session if exists//
    const existingSession = await Session.findOne({ userId: user._id });
    if (existingSession) {
      await Session.deleteOne({ userId: user._id });
    }

    // Create new session//
    await Session.create({
      userId: user._id,
      refreshToken
    });
    
user.isLoggedIn = true;
await user.save();
    return res.status(200).json({
      success: true,
      message: `Welcome back ${user.email}`,
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
// verifcation//
export const verifcation = async (req, res) => {
  console.log("Verify route hit ");
  console.log("Token:", req.query.token);

  try {
    const { token } = req.query;

    if (!token) {
      return res.status(400).json({
        success: false,
        message: "Token missing"
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await userModels.findById(decoded.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    user.isVerified = true;
    await user.save();

    return res.status(200).json({
      success: true,
      message: "Email verified successfully"
    });

  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Invalid or expired token"
    });
  }
};
// logout//
   export const logoutUser = async (req, res) => {
  try {
    const userId = req.userId;

    await Session.deleteMany({ userId });

    await userModels.findByIdAndUpdate(userId, {
      isLoggedIn: false
    });

    return res.status(200).json({
      success: true,
      message: "Logout successfully"
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

//forgetpassword//
export const  forgotpassword= async(req,res)=>{
  try{
const {email} = req.body;
const user =await userModels.findOne({email})
if(!user){
  return res.status(404).json({
    success:false,
    message:"user not found"
  })

}
const otp = Math.floor( 100000 +Math.random()*900000).toString();
const expiry = new Date(Date.now()+10 * 60 * 1000)
user.otp =otp;
user.otpExpiry =expiry;
await user.save()
await sendMail(email,otp);
return res.status(200).json({
  success:true,
  message:"otp send successful"
})
  }catch(error){
    return res.status(500).json({
      success:false,
      message:error.message
    })

  }
}
export const verifyOTP = async (req, res) => {
  const { otp, email } = req.body;   //  correct

  if (!otp || !email) {
    return res.status(400).json({
      success: false,
      message: "OTP and Email are required"
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

    if (!user.otp || !user.otpExpiry) {
      return res.status(400).json({
        success: false,
        message: "OTP not generated or already verified"
      });
    }

    if (user.otpExpiry < new Date()) {
      return res.status(400).json({
        success: false,
        message: "OTP has expired, please request a new one"
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
    user.isVerified = true;  
    await user.save();

    return res.status(200).json({
      success: true,
      message: "OTP verified successfully"
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
};


// chnge password //
export const chnagePassword = async (req, res) => {
  const { email, newPassword, comfirmPassword } = req.body;

  if (!email || !newPassword || !comfirmPassword) {
    return res.status(400).json({
      success: false,
      message: "All fields are required"
    });
  }

  if (newPassword !== comfirmPassword) {
    return res.status(400).json({
      success: false,
      message: "Password does not match"
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
      message: "Password changed successfully"
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
};