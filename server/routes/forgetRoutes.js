import express from "express";
import nodemailer from "nodemailer";
import User from "../models/User.js";

const router = express.Router();


// EMAIL SETUP

const transporter = nodemailer.createTransport({

service:"gmail",

auth:{

user:process.env.EMAIL_USER,

pass:process.env.EMAIL_PASS

}

});


// SEND OTP

router.post("/forget-password",async(req,res)=>{

try{

const {email}=req.body;

const user = await User.findOne({email});

if(!user){

return res.json({

message:"User Not Found"

});

}

const otp = Math.floor(

100000+Math.random()*900000

).toString();

user.resetOTP = otp;

user.otpExpire =

Date.now()+10*60*1000;

await user.save();

await transporter.sendMail({

from:process.env.EMAIL_USER,

to:email,

subject:"CreatorHub OTP",

text:`Your OTP is ${otp}`

});

res.json({

success:true,

message:"OTP Sent"

});

}catch(error){

res.json({

message:error.message

});

}

});


// RESET PASSWORD

router.post("/reset-password",async(req,res)=>{

try{

const{

email,

otp,

password

}=req.body;

const user=

await User.findOne({email});

if(

!user ||

user.resetOTP!==otp ||

user.otpExpire<Date.now()

){

return res.json({

message:"Invalid OTP"

});

}

user.password=password;

user.resetOTP=null;

await user.save();

res.json({

message:"Password Updated"

});

}catch{

res.json({

message:"Error"

});

}

});


export default router;
