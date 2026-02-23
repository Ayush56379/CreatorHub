import express from "express";

import Order from "../models/Order.js";

import authMiddleware from
"../middleware/authMiddleware.js";

import upload from
"../middleware/uploadMiddleware.js";

const router = express.Router();


// ================= PAYMENT PROOF UPLOAD =================

router.post(

"/proof",

authMiddleware,

upload.single("proof"),

async(req,res)=>{

try{

const product =
req.body.product;

if(!req.file){

return res.status(400).json({

message:"Screenshot Required"

});

}

await Order.create({

user:req.user.id,

product,

proof:req.file.filename

});

res.json({

success:true,

message:"Payment Submitted"

});

}catch(error){

console.log(error);

res.status(500).json({

message:"Upload Failed"

});

}

});


// ================= USER APPROVED ORDERS =================

router.get(

"/user",

authMiddleware,

async(req,res)=>{

const orders=

await Order.find({

user:req.user.id,

approved:true

});

res.json({

success:true,

orders

});

});


// ================= ADMIN ALL ORDERS =================

router.get(

"/admin",

async(req,res)=>{

const orders=
await Order.find()
.sort({createdAt:-1});

res.json(orders);

});


// ================= APPROVE ORDER =================

router.put(

"/approve/:id",

async(req,res)=>{

await Order.findByIdAndUpdate(

req.params.id,

{

approved:true

}

);

res.json({

message:"Approved"

});

});

export default router;
