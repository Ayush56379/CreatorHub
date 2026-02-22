import express from "express";
import User from "../models/User.js";
import nodemailer from "nodemailer";
import bcrypt from "bcryptjs";

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

console.log("OTP Request For :",email);


// USER CHECK

const user = await User.findOne({email});

if(!user){

return res.json({

message:"User not found"

});

}


// OTP GENERATE

const otp = Math.floor(

100000 + Math.random()*900000

).toString();


// SAVE OTP

user.resetOTP = otp;

user.otpExpire = Date.now()+5*60*1000;

await user.save();

console.log("Generated OTP :",otp);


// SEND MAIL

await transporter.sendMail({

from:`CreatorHub <${process.env.EMAIL}>`,

to:email,

subject:"CreatorHub Password Reset OTP",

html:`

<h2>Password Reset OTP</h2>

<h1>${otp}</h1>

<p>This OTP valid for 5 minutes.</p>

`

});


console.log("Email Sent Successfully");


res.json({

message:"OTP Sent Successfully"

});


}catch(err){

console.log("EMAIL ERROR :",err);

res.status(500).json({

message:"OTP Failed"

});

}

});



// ===== RESET PASSWORD =====

router.post("/reset-password",async(req,res)=>{

try{

const {email,otp,newPassword}=req.body;


// USER CHECK

const user = await User.findOne({

email,

resetOTP:otp,

otpExpire:{$gt:Date.now()}

});


if(!user){

return res.json({

message:"Invalid OTP"

});

}


// PASSWORD HASH

const hashedPassword = await bcrypt.hash(

newPassword,

10

);


user.password = hashedPassword;

user.resetOTP = null;

user.otpExpire = null;

await user.save();


res.json({

message:"Password Updated Successfully"

});

}catch(err){

console.log("RESET ERROR :",err);

res.status(500).json({

message:"Reset Failed"

});

}

});


export default router;
