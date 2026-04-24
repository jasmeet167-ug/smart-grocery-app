import mongoose from "mongoose";

const connectDB = () => {
  const mongo_url = process.env.MONGO_URI;

  mongoose.connect(mongo_url)
    .then(() => {
      console.log("MongoDB connected ");   
    })
    .catch((error) => {
      console.error("MongoDB connection error:", error.message); 
    });
};

export default connectDB;
