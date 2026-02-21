import express from "express";

import Product from "../models/Product.js";
import authMiddleware from
"../middleware/authMiddleware.js";

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

res.json(product);

}catch{

res.status(500).json({

message:"Error"

});

}

});


// ================= UPLOAD PRODUCT =================
// LOGIN REQUIRED

router.post(
"/upload",
authMiddleware,

async(req,res)=>{

try{

const {

title,
price,
description,
fileLink

} = req.body;


const product =
await Product.create({

title,
price,
description,
fileLink,
creator:req.user.id

});


res.status(201).json({

success:true,
product

});

}catch(error){

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


export default router;
