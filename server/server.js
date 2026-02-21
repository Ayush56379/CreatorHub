import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

// ========= ROUTES IMPORT =========

import productRoutes from "./routes/productRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";


// ================= ENV CONFIG =================

dotenv.config();


// ================= APP INIT =================

const app = express();


// ================= MIDDLEWARE =================

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({

extended:true

}));


// ================= DATABASE CONNECTION =================

const connectDatabase = async () => {

try{

await mongoose.connect(

process.env.MONGO_URI

);

console.log("✅ MongoDB Connected");

}catch(error){

console.error(

"❌ Database Connection Failed:",

error.message

);

process.exit(1);

}

};

connectDatabase();


// ================= BASIC ROUTE =================

app.get("/",(req,res)=>{

res.status(200).json({

project:"CreatorHub",

status:"API Running Successfully 🚀"

});

});


// ================= API ROUTES =================

// Products

app.use(

"/api/products",

productRoutes

);


// Login + Register

app.use(

"/api/auth",

authRoutes

);


// Orders + Payment

app.use(

"/api/orders",

orderRoutes

);


// Creator Dashboard

app.use(

"/api/dashboard",

dashboardRoutes

);


// SUPER ADMIN CONTROL

app.use(

"/api/admin",

adminRoutes

);


// ================= ERROR HANDLER =================

app.use((err,req,res,next)=>{

console.error(err.stack);

res.status(500).json({

success:false,

message:"Internal Server Error"

});

});


// ================= SERVER START =================

const PORT =

process.env.PORT || 5000;

app.listen(PORT,()=>{

console.log(

`🚀 CreatorHub Server Running On Port ${PORT}`

);

});
