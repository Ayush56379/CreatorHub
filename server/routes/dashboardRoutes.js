import express from "express";

import Product from "../models/Product.js";
import User from "../models/User.js";

import authMiddleware from
"../middleware/authMiddleware.js";

const router =
express.Router();


// ================= MY PROFILE =================

router.get(

"/profile",

authMiddleware,

async(req,res)=>{

try{

const user =
await User.findById(

req.user.id

).select("-password");

res.json({

success:true,
user

});

}catch{

res.status(500).json({

message:"Profile Error"

});

}

});



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

message:"Fetch Error"

});

}

});



export default router;
