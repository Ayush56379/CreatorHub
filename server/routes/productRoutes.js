import express from "express";

import Product from "../models/Product.js";

import Order from "../models/Order.js";

import authMiddleware from
"../middleware/authMiddleware.js";

import upload from
"../middleware/uploadMiddleware.js";

import path from "path";


const router = express.Router();


// ================= GET ALL PRODUCTS =================

router.get("/", async(req,res)=>{

try{

const products =
await Product.find()
.sort({createdAt:-1});

res.json({

success:true,
products

});

}catch(error){

res.status(500).json({

message:"Fetch Error"

});

}

});


// ================= SINGLE PRODUCT =================

router.get("/:id", async(req,res)=>{

try{

const product =
await Product.findById(
req.params.id
);

if(!product){

return res.status(404).json({

message:"Product Not Found"

});

}

res.json({

success:true,
product

});

}catch{

res.status(500).json({

message:"Error"

});

}

});


// ================= UPLOAD PRODUCT =================

router.post(

"/upload",

authMiddleware,

upload.single("file"),

async(req,res)=>{

try{

const {

title,
price,
description

} = req.body;


// File Required

if(!req.file){

return res.status(400).json({

message:"File Required"

});

}

const filePath =
req.file.filename;


// Save Product

const product =
await Product.create({

title,
price,
description,

fileLink:filePath,

creator:req.user.id

});


res.status(201).json({

success:true,
message:"Product Uploaded",
product

});

}catch(error){

console.log(error);

res.status(500).json({

message:"Upload Failed"

});

}

});


// ================= DELETE PRODUCT =================

router.delete(

"/:id",

authMiddleware,

async(req,res)=>{

try{

await Product.findByIdAndDelete(

req.params.id

);

res.json({

success:true,
message:"Deleted"

});

}catch{

res.status(500).json({

message:"Delete Error"

});

}

});


// ================= PROTECTED DOWNLOAD =================

router.get(

"/download/:id",

authMiddleware,

async(req,res)=>{

try{

// Product Find

const product =
await Product.findById(
req.params.id
);

if(!product){

return res.status(404).json({

message:"Product Not Found"

});

}


// Check Purchase

const order =
await Order.findOne({

user:req.user.id,
product:req.params.id,
paid:true

});

if(!order){

return res.status(403).json({

message:"Buy Product First"

});

}


// Download File

const filePath =
path.resolve(

"uploads",
product.fileLink

);

res.download(filePath);

}catch(error){

res.status(500).json({

message:"Download Error"

});

}

});


export default router;
