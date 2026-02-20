import express from "express";

const router = express.Router();


// ================= SAMPLE DATABASE (TEMP) =================

// अभी MongoDB नहीं लगाया इसलिए temp data।

let products = [

{
 id:1,
 title:"Starter Notes Bundle",
 price:199,
 creator:"Admin"
},

{
 id:2,
 title:"Design Template Pack",
 price:299,
 creator:"Admin"
}

];


// ================= GET ALL PRODUCTS =================

router.get("/",(req,res)=>{

res.status(200).json({

success:true,
total:products.length,
products

});

});


// ================= GET SINGLE PRODUCT =================

router.get("/:id",(req,res)=>{

const id =
parseInt(req.params.id);

const product =
products.find(
p => p.id === id
);

if(!product){

return res.status(404).json({

success:false,
message:"Product Not Found"

});

}

res.json({

success:true,
product

});

});


// ================= UPLOAD PRODUCT =================

router.post("/upload",(req,res)=>{

const {title,price,creator}
= req.body;

if(!title || !price){

return res.status(400).json({

success:false,
message:"Title and Price Required"

});

}

const newProduct = {

id:products.length + 1,
title,
price,
creator:creator || "Creator"

};

products.push(newProduct);

res.status(201).json({

success:true,
message:"Product Uploaded Successfully",
product:newProduct

});

});


// ================= DELETE PRODUCT =================

router.delete("/:id",(req,res)=>{

const id =
parseInt(req.params.id);

products =
products.filter(

p => p.id !== id

);

res.json({

success:true,
message:"Product Deleted"

});

});


export default router;
