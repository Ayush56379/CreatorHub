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


// ================= CORS SAFE =================

// ⭐ Github Pages + Future Domain Safe

app.use(cors({

origin:true,

credentials:true

}));


// ================= BODY PARSER =================

app.use(express.json({

limit:"50mb"

}));

app.use(express.urlencoded({

extended:true,

limit:"50mb"

}));



// ================= DATABASE =================

async function connectDatabase(){

try{

await mongoose.connect(

process.env.MONGO_URI

);

console.log("✅ MongoDB Connected");

}catch(error){

console.log(

"❌ DB Error",

error.message

);

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



// ================= ERROR HANDLER =================

app.use((err,req,res,next)=>{

console.error("SERVER ERROR :",err);

res.status(500).json({

success:false,

message:"Internal Server Error"

});

});



// ================= SERVER =================

const PORT = process.env.PORT || 10000;

app.listen(PORT,()=>{

console.log(

`🚀 CreatorHub Server Running On Port ${PORT}`

);

});
