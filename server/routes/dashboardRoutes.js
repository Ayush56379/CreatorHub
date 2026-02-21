import express from "express";

import Product from "../models/Product.js";
import User from "../models/User.js";
import Order from "../models/Order.js";

import authMiddleware from
"../middleware/authMiddleware.js";

const router =
express.Router();


// ================= MY PROFILE =================

router.get(

"/profile",

authMiddleware,

async(req,res)=>{

try{

const user =
await User.findById(

req.user.id

).select("-password");

res.json({

success:true,
user

});

}catch{

res.status(500).json({

message:"Profile Error"

});

}

});



// ================= CREATOR PRODUCTS =================

router.get(

"/myproducts",

authMiddleware,

async(req,res)=>{

try{

const products =
await Product.find({

creator:req.user.id

});

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



// ================= CREATOR SALES DASHBOARD =================

router.get(

"/sales",

authMiddleware,

async(req,res)=>{

try{

// creator products

const products =
await Product.find({

creator:req.user.id

});

const productIds =
products.map(

p=>p._id

);


// find paid orders

const orders =
await Order.find({

product:{
$in:productIds
},

paid:true

}).populate("product");


let totalSales =
orders.length;

let totalRevenue = 0;


// calculate earning

orders.forEach(order=>{

totalRevenue +=
order.product.price;

});


res.json({

success:true,

totalSales,

totalRevenue,

orders

});

}catch{

res.status(500).json({

message:"Sales Error"

});

}

});


export default router;
