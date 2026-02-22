import mongoose from "mongoose";

const userSchema = new mongoose.Schema({

name:{
type:String,
required:true
},

email:{
type:String,
required:true,
unique:true,
lowercase:true,
trim:true
},

password:{
type:String,
required:true
},

// ⭐ ROLE SYSTEM FIX

role:{
type:String,
enum:["user","admin","buyer"], // buyer add किया
default:"user"
},

// ⭐ FORGET PASSWORD OTP

resetOTP:{
type:String,
default:null
},

otpExpire:{
type:Date,
default:null
}

},{
timestamps:true
});

export default mongoose.model(
"User",
userSchema
);
