import mongoose from "mongoose";

const productSchema =
new mongoose.Schema({

title:{
type:String,
required:true
},

price:{
type:Number,
required:true
},

// ⭐ Cover Image URL

image:{
type:String,
required:true
},

// ⭐ Google Drive PDF Link

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

export default mongoose.model(

"Product",

productSchema

);
