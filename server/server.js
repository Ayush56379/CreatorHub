import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import authRoutes from "./routes/authRoutes.js";
import forgetRoutes from "./routes/forgetRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";


dotenv.config();

const app = express();


// ⭐ CORS FIX (GitHub Website Access)

app.use(cors({
origin:"*"
}));


// ⭐ BODY PARSER

app.use(express.json());

app.use(express.urlencoded({
extended:true
}));


// ================= DATABASE =================

async function connectDatabase(){

try{

await mongoose.connect(

process.env.MONGO_URI,

{
useNewUrlParser:true,
useUnifiedTopology:true
}

);

console.log("✅ MongoDB Connected");

}catch(error){

console.log("❌ DB Error",error);

process.exit(1);

}

}

connectDatabase();


// ================= ROOT =================

app.get("/",(req,res)=>{

res.json({

project:"CreatorHub",

status:"API Running 🚀"

});

});

app.get("/api",(req,res)=>{

res.json({

status:"API Working 🚀"

});

});


// ================= ROUTES =================

app.use("/api/auth",authRoutes);

app.use("/api/auth",forgetRoutes);

app.use("/api/products",productRoutes);

app.use("/api/orders",orderRoutes);

app.use("/api/dashboard",dashboardRoutes);

app.use("/api/admin",adminRoutes);


// ================= ERROR =================

app.use((err,req,res,next)=>{

console.log(err);

res.status(500).json({

success:false,

message:"Server Error"

});

});


// ================= START SERVER =================

const PORT = process.env.PORT || 10000;

app.listen(PORT,()=>{

console.log(

"🚀 Server Running On "+PORT

);

});
