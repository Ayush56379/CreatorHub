import express from "express";

import Order from "../models/Order.js";

import Product from "../models/Product.js";

import authMiddleware from
"../middleware/authMiddleware.js";

const router=express.Router();


// ⭐ CREATE ORDER (Buyer Screenshot Upload)

router.post(

"/",

authMiddleware,

async(req,res)=>{

try{

const {

productId,

proof

}=req.body;


// Product Find

const product=

await Product.findById(

productId

);

if(!product){

return res.status(404)

.json({

message:"Product Missing"

});

}


// Save Order

const order=

await Order.create({

user:req.user.id,

product:productId,

paymentProof:proof,

status:"pending"

});


res.json({

success:true,

message:

"Payment Submitted"

});

}catch(e){

res.status(500)

.json({

message:"Order Error"

});

}

});




// ⭐ BUYER LIBRARY

router.get(

"/my",

authMiddleware,

async(req,res)=>{

try{

const orders=

await Order.find({

user:req.user.id,

status:"approved"

})

.populate("product");


res.json({

orders

});

}catch{

res.status(500)

.json({

message:"Error"

});

}

});




// ⭐ ADMIN ALL ORDERS

router.get(

"/admin",

authMiddleware,

async(req,res)=>{

try{

const orders=

await Order.find()

.populate("product")

.populate("user");


res.json({

orders

});

}catch{

res.status(500)

.json({

message:"Error"

});

}

});




// ⭐ APPROVE ORDER

router.put(

"/approve/:id",

authMiddleware,

async(req,res)=>{

try{

await Order.findByIdAndUpdate(

req.params.id,

{

status:"approved"

}

);


res.json({

message:"Approved"

});

}catch{

res.status(500)

.json({

message:"Error"

});

}

});

export default router;
