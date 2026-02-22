import express from "express";
import User from "../models/User.js";
import nodemailer from "nodemailer";

const router = express.Router();


// ===== EMAIL TRANSPORT =====

const transporter = nodemailer.createTransport({

host:"smtp.gmail.com",

port:587,

secure:false,

auth:{

user:process.env.EMAIL,

pass:process.env.EMAIL_PASS

}

});


// ===== SEND OTP =====

router.post("/send-otp",async(req,res)=>{

try{

console.log("EMAIL =",process.env.EMAIL);

console.log("PASS =",process.env.EMAIL_PASS);

const {email}=req.body;

const user=await User.findOne({email});

if(!user){

return res.json({

message:"User not found"

});

}


// OTP

const otp=Math.floor(

100000+Math.random()*900000

).toString();


// SAVE

user.resetOTP=otp;

user.otpExpire=Date.now()+5*60*1000;

await user.save();


// SEND EMAIL

const info=await transporter.sendMail({

from:`CreatorHub <${process.env.EMAIL}>`,

to:email,

subject:"CreatorHub OTP",

html:`

<h2>Your OTP :</h2>

<h1>${otp}</h1>

<p>Valid 5 Minutes</p>

`

});

console.log("MAIL SENT :",info.response);

res.json({

message:"OTP Sent Successfully"

});

}catch(err){

console.log("EMAIL ERROR =",err);

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
