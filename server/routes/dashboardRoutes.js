import express from "express";

import Product from "../models/Product.js";
import User from "../models/User.js";

import authMiddleware from
"../middleware/authMiddleware.js";

const router = express.Router();


// ================= CREATOR PRODUCTS =================

router.get(

"/myproducts",

authMiddleware,

async(req,res)=>{

try{

const products =
await Product.find({

creator:req.user.id

});

res.json({

success:true,
products

});

}catch{

res.status(500).json({

message:"Error"

});

}

});


// ================= ADMIN ALL USERS =================

router.get(

"/admin/users",

authMiddleware,

async(req,res)=>{

try{

const users =
await User.find();

res.json({

success:true,
users

});

}catch{

res.status(500).json({

message:"Error"

});

}

});


// ================= ADMIN ALL PRODUCTS =================

router.get(

"/admin/products",

authMiddleware,

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

message:"Error"

});

}

});


export default router;
