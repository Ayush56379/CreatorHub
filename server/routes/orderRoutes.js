import express from "express";

import Order from "../models/Order.js";

import Product from "../models/Product.js";

import authMiddleware from
"../middleware/authMiddleware.js";

const router = express.Router();


// ================= BUY PRODUCT =================

router.post(

"/buy/:productId",

authMiddleware,

async(req,res)=>{

try{

// product check

const product =
await Product.findById(

req.params.productId

);

if(!product){

return res.status(404).json({

message:"Product Not Found"

});

}


// Payment Success (Simulation)

const order =
await Order.create({

user:req.user.id,

product:req.params.productId,

paid:true

});

res.json({

success:true,

message:"Payment Successful",

order

});

}catch(error){

res.status(500).json({

message:"Payment Failed"

});

}

});


// ================= MY ORDERS =================

router.get(

"/myorders",

authMiddleware,

async(req,res)=>{

try{

const orders =
await Order.find({

user:req.user.id

});

res.json({

success:true,
orders

});

}catch{

res.status(500).json({

message:"Error"

});

}

});

export default router;
