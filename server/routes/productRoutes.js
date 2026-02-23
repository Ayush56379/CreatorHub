// ================= DRIVE LINK UPLOAD =================

router.post(
"/",
authMiddleware,
async(req,res)=>{

try{

const {

title,
price,
image,
pdf

} = req.body;


if(!title || !price || !image || !pdf){

return res.status(400).json({

message:"Fill All Fields"

});

}


const product = await Product.create({

title,
price,
image,
fileLink:pdf,

creator:req.user.id

});


res.status(201).json({

success:true,
message:"Ebook Uploaded Successfully",

product

});

}catch(error){

console.log(error);

res.status(500).json({

message:"Upload Failed"

});

}

});
