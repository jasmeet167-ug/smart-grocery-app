import mongoose from "mongoose";

const Schema = mongoose.Schema;

const sessionSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true
  },
  refreshToken: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

export const Session = mongoose.model("Session", sessionSchema);