import express from "express";

import Product from "../models/Product.js";

import authMiddleware from "../middleware/authMiddleware.js";

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

}catch{

res.status(500).json({

message:"Fetch Error"

});

}

});


// ================= UPLOAD EBOOK =================

router.post(

"/upload",

authMiddleware,

async(req,res)=>{

try{

const {

title,
price,
image,
pdf

}=req.body;


// VALIDATION

if(!title || !price || !image || !pdf){

return res.status(400).json({

message:"Fill All Fields"

});

}


// SAVE

await Product.create({

title,
price,
image,
pdf,

creator:req.user.id

});


res.json({

success:true,

message:"Uploaded Successfully 🔥"

});

}catch(error){

console.log(error);

res.status(500).json({

message:"Upload Failed"

});

}

});


export default router;
