import mongoose from "mongoose";

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true 
  },
  password: {
    type: String,
    required: true,
  },
  isVerified:{
    type:Boolean,
    default:false
  },
    
  isLoggedIn: {
  type: Boolean,
  default: false
},
  otp:{
    type:String,
    default:null
  },
  otpExpiry:{  
    type:Date,
    default:null
  },
},
{
  timestamps:true
});

const userModels = mongoose.model("users", UserSchema);

export default userModels;