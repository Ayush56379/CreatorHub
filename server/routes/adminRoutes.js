import express from "express";

import User from "../models/User.js";
import Product from "../models/Product.js";

import authMiddleware from
"../middleware/authMiddleware.js";

import adminMiddleware from
"../middleware/adminMiddleware.js";

const router = express.Router();


// ================= BAN USER =================

router.delete(

"/user/:id",

authMiddleware,

adminMiddleware,

async(req,res)=>{

try{

await User.findByIdAndDelete(

req.params.id

);

res.json({

success:true,

message:"User Deleted"

});

}catch{

res.status(500).json({

message:"Delete Error"

});

}

});


// ================= DELETE ANY PRODUCT =================

router.delete(

"/product/:id",

authMiddleware,

adminMiddleware,

async(req,res)=>{

try{

await Product.findByIdAndDelete(

req.params.id

);

res.json({

success:true,

message:"Product Removed"

});

}catch{

res.status(500).json({

message:"Error"

});

}

});


// ================= ALL USERS =================

router.get(

"/users",

authMiddleware,

adminMiddleware,

async(req,res)=>{

const users =
await User.find();

res.json({

success:true,
users

});

});

export default router;
