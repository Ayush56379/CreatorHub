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

description:{
 type:String
},

creator:{
 type:String,
 default:"Creator"
},

fileLink:{
 type:String
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
