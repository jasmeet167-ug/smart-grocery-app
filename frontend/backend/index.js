import dotenv from "dotenv";
dotenv.config();

import express from "express";
import connectDB from "./Models/db.js";
import cors from "cors";
import authRouter from "./Routes/authRoutes.js"
const app = express();
const PORT = process.env.PORT || 8050;

connectDB();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Server is running ");
});

app.use("/auth", authRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
