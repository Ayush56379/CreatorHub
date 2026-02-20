import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import User from "../models/User.js";

const router = express.Router();


// ========= REGISTER =========

router.post("/register",

async(req,res)=>{

try{

const {name,email,password}
= req.body;

const exist =
await User.findOne({email});

if(exist){

return res.json({

message:"User Exists"

});

}

const hash =
await bcrypt.hash(
password,
10
);

const user =
await User.create({

name,
email,
password:hash

});

res.status(201).json({

success:true,
user

});

}catch(error){

res.status(500).json({

message:"Register Error"

});

}

});


// ========= LOGIN =========

router.post("/login",

async(req,res)=>{

try{

const {email,password}
= req.body;

const user =
await User.findOne({email});

if(!user){

return res.json({

message:"User Not Found"

});

}

const match =
await bcrypt.compare(

password,
user.password

);

if(!match){

return res.json({

message:"Wrong Password"

});

}

const token =
jwt.sign(

{id:user._id},

process.env.JWT_SECRET,

{

expiresIn:"7d"

}

);

res.json({

success:true,
token

});

}catch(error){

res.status(500).json({

message:"Login Error"

});

}

});

export default router;
