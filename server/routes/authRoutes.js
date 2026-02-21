import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const router = express.Router();


// REGISTER

router.post("/register", async (req,res)=>{

try{

const {name,email,password} = req.body;

const existUser = await User.findOne({email});

if(existUser){

return res.json({
message:"User already exists"
});

}

const hashedPassword =
await bcrypt.hash(password,10);

const user = await User.create({

name,
email,
password:hashedPassword

});

res.json({

message:"User Registered",
user

});

}catch(error){

res.status(500).json(error.message);

}

});



// LOGIN

router.post("/login", async(req,res)=>{

try{

const {email,password} = req.body;

const user = await User.findOne({email});

if(!user){

return res.json({
message:"User not found"
});

}

const match =
await bcrypt.compare(
password,
user.password
);

if(!match){

return res.json({
message:"Wrong password"
});

}

const token = jwt.sign(

{id:user._id},

process.env.JWT_SECRET,

{expiresIn:"7d"}

);

res.json({

message:"Login Success",

token,
user

});

}catch(error){

res.status(500).json(error.message);

}

});

export default router;
