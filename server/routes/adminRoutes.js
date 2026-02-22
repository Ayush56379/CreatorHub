import express from "express";

import User from "../models/User.js";
import Product from "../models/Product.js";
import Order from "../models/Order.js";

import authMiddleware from
"../middleware/authMiddleware.js";

const router = express.Router();


// ================= ADMIN CHECK =================

const adminOnly = (req,res,next)=>{

if(req.user.role !== "admin"){

return res.status(403).json({

message:"Admin Only"

});

}

next();

};


// ================= ADMIN PRODUCT UPLOAD =================

router.post(

"/upload",

authMiddleware,

adminOnly,

async(req,res)=>{

try{

const {

title,
price,
description

} = req.body;


const product =
await Product.create({

title,
price,
description,

creator:req.user.id

});


res.json({

success:true,

message:"Product Uploaded 🚀",

product

});

}catch(error){

res.status(500).json({

message:error.message

});

}

});


// ================= ALL USERS =================

router.get(

"/users",

authMiddleware,

adminOnly,

async(req,res)=>{

try{

const users =
await User.find()
.select("-password");

res.json({

success:true,
users

});

}catch{

res.status(500).json({

message:"Users Error"

});

}

});


// ================= DELETE USER =================

router.delete(

"/user/:id",

authMiddleware,

adminOnly,

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


// ================= ALL PRODUCTS =================

router.get(

"/products",

authMiddleware,

adminOnly,

async(req,res)=>{

try{

const products =
await Product.find();

res.json({

success:true,
products

});

}catch{

res.status(500).json({

message:"Product Error"

});

}

});


// ================= DELETE PRODUCT =================

router.delete(

"/product/:id",

authMiddleware,

adminOnly,

async(req,res)=>{

try{

await Product.findByIdAndDelete(

req.params.id

);

res.json({

success:true,
message:"Product Deleted"

});

}catch{

res.status(500).json({

message:"Delete Error"

});

}

});


// ================= ALL ORDERS =================

router.get(

"/orders",

authMiddleware,

adminOnly,

async(req,res)=>{

try{

const orders =
await Order.find()

.populate("user","name email")

.populate("product");

res.json({

success:true,
orders

});

}catch{

res.status(500).json({

message:"Order Error"

});

}

});

export default router;
