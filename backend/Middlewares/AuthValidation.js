import jwt from "jsonwebtoken"
import User from "../Models/user.js";
import {Session} from "../Models/SessionModal.js" 
import Joi from "joi";
export const signupValidation = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(4).max(100).required(),
  });

  const { error } = schema.validate(req.body);

  if (error) {
    return res.status(400).json({
      message: "bad request",
      error,
    });
  }

  next();
};
export const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);

    req.userId = decoded.id;

    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

export const logoutUser = async (req, res) => {
  try {

    if (!req.userId) {
      return res.status(401).json({
        success: false,
        message: "User not authenticated",
      });
    }

    await Session.deleteMany({ userId: req.userId });

    await User.findByIdAndUpdate(req.userId, {
      isLoggedIn: false,
    });

    return res.status(200).json({
      success: true,
      message: "Logout successfully",
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};