import express from "express";
import Order from "../models/Order.js";
import Product from "../models/Product.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();


// ================= PLACE ORDER =================

router.post("/",

authMiddleware,

async(req,res)=>{

try{

const { productId } = req.body;


// PRODUCT CHECK

const product =

await Product.findById(

productId

);

if(!product){

return res.status(404).json({

message:"Product Not Found"

});

}


// CREATE ORDER

const order=

await Order.create({

user:req.user.id,

product:productId,

status:"Pending"

});


res.json({

success:true,

order

});

}catch(e){

console.log(e);

res.status(500).json({

message:"Order Failed"

});

}

});



// ================= GET USER ORDERS =================

router.get("/",

authMiddleware,

async(req,res)=>{

try{

const orders=

await Order.find({

user:req.user.id

})

.populate("product")

.sort({

createdAt:-1

});


res.json({

success:true,

orders

});

}catch(e){

console.log(e);

res.status(500).json({

message:"Fetch Orders Failed"

});

}

});


export default router;
