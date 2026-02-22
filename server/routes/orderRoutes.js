import express from "express";

import Order from "../models/Order.js";
import Product from "../models/Product.js";

import authMiddleware from
"../middleware/authMiddleware.js";

const router =
express.Router();


// ================= CREATE ORDER =================

router.post(

"/buy",

authMiddleware,

async(req,res)=>{

try{

const {productId} =
req.body;


// product check

const product =
await Product.findById(

productId

);

if(!product){

return res.status(404)

.json({

message:"Product Not Found"

});

}


// order create

const order =
await Order.create({

user:req.user.id,

product:productId,

price:product.price,

status:"paid"

});


res.json({

success:true,

message:"Order Success",

order

});

}catch{

res.status(500).json({

message:"Order Error"

});

}

});


export default router;
