import express from "express";

import Product from "../models/Product.js";

import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();


// ================= ALL PRODUCTS =================

router.get("/", async (req,res)=>{

try{

const products = await Product.find()

.sort({createdAt:-1});

res.json({

success:true,

products

});

}catch(error){

console.log("Fetch Product Error",error);

res.status(500).json({

success:false,

message:"Fetch Error"

});

}

});




// ================= SINGLE PRODUCT =================

router.get("/:id", async(req,res)=>{

try{

const product=

await Product.findById(

req.params.id

);

if(!product){

return res.status(404).json({

success:false,

message:"Product Not Found"

});

}

res.json({

success:true,

product

});

}catch(error){

console.log("Single Product Error",error);

res.status(500).json({

success:false,

message:"Error"

});

}

});




// ================= UPLOAD PRODUCT =================

router.post("/",

authMiddleware,

async(req,res)=>{

try{

const {

title,
price,
image,
pdf,
description

}=req.body;


// VALIDATION SAFE

if(

!title ||

!price ||

!image ||

!pdf

){

return res.status(400).json({

success:false,

message:"Fill All Fields"

});

}


// CREATE PRODUCT

const product=

await Product.create({

title,

price:Number(price),

image,

pdf,

description:

description ||

"Digital Ebook",

creator:req.user.id

});


res.json({

success:true,

message:"Uploaded Successfully 🔥",

product

});

}catch(error){

console.log("Upload Error",error);

res.status(500).json({

success:false,

message:"Upload Failed"

});

}

});



export default router;
