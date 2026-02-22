import jwt from "jsonwebtoken";
import User from "../models/User.js";

const adminProtect = async (req,res,next)=>{

try{

let token;

if(

req.headers.authorization &&

req.headers.authorization.startsWith("Bearer")

){

token = req.headers.authorization.split(" ")[1];

}

if(!token){

return res.status(401).json({

message:"Login Required"

});

}

// Token verify

const decoded = jwt.verify(

token,

process.env.JWT_SECRET

);

// User find

const user = await User.findById(

decoded.id

);

if(!user){

return res.status(401).json({

message:"User Not Found"

});

}

// ADMIN CHECK

if(user.role !== "admin"){

return res.status(403).json({

message:"Admin Only Access"

});

}

req.user = user;

next();

}catch(error){

res.status(401).json({

message:"Unauthorized"

});

}

};

export default adminProtect;
