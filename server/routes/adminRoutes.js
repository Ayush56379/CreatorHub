import express from "express";

import User from "../models/User.js";
import Product from "../models/Product.js";
import Order from "../models/Order.js";

import authMiddleware from
"../middleware/authMiddleware.js";

const router = express.Router();


// ================= ADMIN CHECK =================

const adminOnly =
(req,res,next)=>{

if(req.user.role !== "admin"){

return res.status(403).json({

success:false,
message:"Admin Only"

});

}

next();

};



// ================= ADD PRODUCT (ADMIN UPLOAD) =================

router.post(

"/product",

authMiddleware,

adminOnly,

async(req,res)=>{

try{

const {

title,
price,
image

} = req.body;


// validation

if(!title || !price){

return res.status(400).json({

success:false,
message:"Title and Price Required"

});

}


// create product

const newProduct =
new Product({

title,
price,
image

});

await newProduct.save();


res.json({

success:true,
message:"Product Uploaded Successfully 🚀"

});

}catch(error){

res.status(500).json({

success:false,
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
