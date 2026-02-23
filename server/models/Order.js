import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({

user:{
type:String,
required:true
},

product:{
type:String,
required:true
},

proof:{
type:String,
required:true
},

approved:{
type:Boolean,
default:false
},

createdAt:{
type:Date,
default:Date.now
}

});

export default mongoose.model(
"Order",
orderSchema
);
