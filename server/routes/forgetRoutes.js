import express from "express";
import crypto from "crypto";
import nodemailer from "nodemailer";
import User from "../models/User.js";

const router = express.Router();


// ================= EMAIL SETUP =================

const transporter = nodemailer.createTransport({

service:"gmail",

auth:{

user:process.env.EMAIL_USER,

pass:process.env.EMAIL_PASS

}

});


// ================= SEND OTP =================

router.post("/forget-password",async(req,res)=>{

try{

const {email} = req.body;

const user = await User.findOne({email});

if(!user){

return res.json({

success:false,

message:"User Not Found"

});

}


// OTP Generate

const otp = Math.floor(

100000 + Math.random()*900000

).toString();


// Save OTP

user.resetOTP = otp;

user.otpExpire = Date.now() + 10*60*1000;

await user.save();


// Send Email

await transporter.sendMail({

from:process.env.EMAIL_USER,

to:email,

subject:"CreatorHub Password Reset OTP",

text:`Your OTP is ${otp}`

});

res.json({

success:true,

message:"OTP Sent To Email"

});

}catch(error){

res.json({

success:false,

message:error.message

});

}

});


// ================= RESET PASSWORD =================

router.post("/reset-password",async(req,res)=>{

try{

const {email,otp,password} = req.body;

const user = await User.findOne({email});

if(

!user ||

user.resetOTP !== otp ||

user.otpExpire < Date.now()

){

return res.json({

success:false,

message:"Invalid OTP"

});

}

user.password = password;

user.resetOTP = null;

await user.save();

res.json({

success:true,

message:"Password Reset Success"

});

}catch(error){

res.json({

success:false,

message:error.message

});

}

});


export default router;
