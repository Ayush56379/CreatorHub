import express from "express";

import Order from "../models/Order.js";
import Product from "../models/Product.js";

import authMiddleware from
"../middleware/authMiddleware.js";

const router = express.Router();


// ================= BUY PRODUCT =================

router.post(

"/buy",

authMiddleware,

async(req,res)=>{

try{

const { productId } =
req.body;


// product check

const product =
await Product.findById(

productId

);

if(!product){

return res.status(404).json({

success:false,

message:"Product Not Found"

});

}


// create order

const order =
await Order.create({

user:req.user.id,

product:productId,

price:product.price,

status:"paid"

});


res.json({

success:true,

message:"Order Success 🎉",

order

});

}catch(error){

res.status(500).json({

success:false,

message:error.message

});

}

});

export default router;
