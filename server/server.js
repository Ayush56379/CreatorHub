import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";


// ===== ROUTES =====

import authRoutes from "./routes/authRoutes.js";
import forgetRoutes from "./routes/forgetRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";


// ===== CONFIG =====

dotenv.config();

const app = express();


// ===== MIDDLEWARE =====

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({

extended:true

}));


// ===== DATABASE =====

mongoose.connect(process.env.MONGO_URI)

.then(()=>{

console.log("✅ MongoDB Connected");

})

.catch((err)=>{

console.log("DB Error",err);

});


// ===== BASIC ROUTES =====

app.get("/",(req,res)=>{

res.json({

project:"CreatorHub",

status:"API Running 🚀"

});

});


app.get("/api",(req,res)=>{

res.json({

status:"API Working"

});

});


// ===== API ROUTES =====

app.use("/api/auth",authRoutes);

app.use("/api/auth",forgetRoutes);

app.use("/api/products",productRoutes);

app.use("/api/orders",orderRoutes);

app.use("/api/dashboard",dashboardRoutes);

app.use("/api/admin",adminRoutes);


// ===== ERROR =====

app.use((err,req,res,next)=>{

console.error(err);

res.status(500).json({

message:"Server Error"

});

});


// ===== START =====

const PORT = process.env.PORT || 10000;

app.listen(PORT,()=>{

console.log(

`🚀 CreatorHub Running On ${PORT}`

);

});
