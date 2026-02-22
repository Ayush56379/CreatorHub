import express from "express";
import User from "../models/User.js";
import nodemailer from "nodemailer";

const router = express.Router();


// ===== EMAIL TRANSPORT =====

const transporter = nodemailer.createTransport({

service:"gmail",

auth:{

user:process.env.EMAIL,

pass:process.env.EMAIL_PASS

}

});


// ===== SEND OTP =====

router.post("/send-otp",async(req,res)=>{

try{

const {email}=req.body;

const user=await User.findOne({email});

if(!user){

return res.json({

message:"User not found"

});

}


// OTP GENERATE

const otp=Math.floor(

100000+Math.random()*900000

).toString();


// SAVE OTP

user.resetOTP=otp;

user.otpExpire=Date.now()+5*60*1000;

await user.save();


// SEND MAIL

await transporter.sendMail({

from:process.env.EMAIL,

to:email,

subject:"CreatorHub Password Reset OTP",

html:`

<h2>Your OTP is :</h2>

<h1>${otp}</h1>

<p>Valid for 5 minutes.</p>

`

});

res.json({

message:"OTP Sent Successfully"

});

}catch(err){

console.log(err);

res.status(500).json({

message:"OTP Failed"

});

}

});


// ===== RESET PASSWORD =====

router.post("/reset-password",async(req,res)=>{

try{

const {email,otp,newPassword}=req.body;

const user=await User.findOne({

email,

resetOTP:otp,

otpExpire:{$gt:Date.now()}

});

if(!user){

return res.json({

message:"Invalid OTP"

});

}


user.password=newPassword;

user.resetOTP=null;

user.otpExpire=null;

await user.save();

res.json({

message:"Password Updated"

});

}catch(err){

console.log(err);

res.status(500).json({

message:"Reset Failed"

});

}

});

export default router;
