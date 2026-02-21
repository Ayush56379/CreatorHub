import User from "../models/User.js";

const adminMiddleware =
async(req,res,next)=>{

try{

// user find

const user =
await User.findById(
req.user.id
);

if(!user){

return res.status(404).json({

message:"User Not Found"

});

}

// role check

if(user.role !== "admin"){

return res.status(403).json({

message:"Admin Only Access"

});

}

next();

}catch{

res.status(500).json({

message:"Admin Check Error"

});

}

};

export default adminMiddleware;
