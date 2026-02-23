import mongoose from "mongoose";

const productSchema = new mongoose.Schema({

title:{
type:String,
required:true
},

price:{
type:Number,
required:true
},

image:{
type:String,
required:true
},

pdf:{
type:String,
required:true
},

description:{
type:String,
default:"Digital Ebook"
},

creator:{
type:String,
required:true
},

createdAt:{
type:Date,
default:Date.now
}

});

const Product = mongoose.model(
"Product",
productSchema
);

export default Product;
