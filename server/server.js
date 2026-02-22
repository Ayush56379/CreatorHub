import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";


// ===== ROUTES IMPORT =====

import authRoutes from "./routes/authRoutes.js";
import forgetRoutes from "./routes/forgetRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";


// ===== ENV CONFIG =====

dotenv.config();


// ===== APP INIT =====

const app = express();


// ===== MIDDLEWARE =====

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({

extended:true

}));


// ===== DATABASE CONNECTION =====

const connectDatabase = async ()=>{

try{

await mongoose.connect(

process.env.MONGO_URI

);

console.log("✅ MongoDB Connected");

}catch(error){

console.error(

"❌ Database Error",

error.message

);

process.exit(1);

}

};

connectDatabase();


// ===== BASIC ROUTES =====

// HOME

app.get("/",(req,res)=>{

res.json({

project:"CreatorHub",

status:"API Running Successfully 🚀"

});

});


// API TEST

app.get("/api",(req,res)=>{

res.json({

status:"API Working 🚀"

});

});


// ===== API ROUTES =====

app.use("/api/auth",authRoutes);

// ⭐ Forget Password OTP

app.use("/api/auth",forgetRoutes);

app.use("/api/products",productRoutes);

app.use("/api/orders",orderRoutes);

app.use("/api/dashboard",dashboardRoutes);

app.use("/api/admin",adminRoutes);


// ===== ERROR HANDLER =====

app.use((err,req,res,next)=>{

console.error(err.stack);

res.status(500).json({

success:false,

message:"Internal Server Error"

});

});


// ===== SERVER START =====

const PORT = process.env.PORT || 10000;

app.listen(PORT,()=>{

console.log(

`🚀 CreatorHub Server Running On Port ${PORT}`

);

});
