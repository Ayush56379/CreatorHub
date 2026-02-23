import express from "express";
import Product from "../models/Product.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();


// ================= GET ALL PRODUCTS =================

router.get("/", async (req,res)=>{

try{

const products = await Product.find()

.sort({createdAt:-1});

res.json({

success:true,
products

});

}catch(error){

console.log(error);

res.status(500).json({

message:"Fetch Error"

});

}

});




// ================= SINGLE PRODUCT (⭐ IMPORTANT FIX) =================

router.get("/:id", async(req,res)=>{

try{

const product = await Product.findById(

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

}catch(error){

console.log(error);

res.status(500).json({

message:"Error Loading Product"

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

} = req.body;


// VALIDATION

if(!title || !price || !image || !pdf){

return res.status(400).json({

message:"Fill All Fields"

});

}


// SAVE PRODUCT

const product = await Product.create({

title,
price,
image,
pdf,

creator:req.user.id

});


res.json({

success:true,

message:"Uploaded Successfully 🔥",

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

message:"Delete Failed"

});

}

});



export default router;
