import { v2 as cloudinary } from "cloudinary";


// ================= CLOUDINARY CONFIG =================

cloudinary.config({

cloud_name:

process.env.CLOUDINARY_CLOUD_NAME,

api_key:

process.env.CLOUDINARY_API_KEY,

api_secret:

process.env.CLOUDINARY_API_SECRET

});


// ================= IMAGE UPLOAD =================

export const uploadImage = async(file)=>{

try{

const result=

await cloudinary.uploader.upload(

file,

{

folder:"creatorhub/images",

resource_type:"image"

}

);

return result.secure_url;

}catch(error){

console.log("Image Upload Error",error);

throw error;

}

};



// ================= PDF UPLOAD =================

export const uploadPDF = async(file)=>{

try{

const result=

await cloudinary.uploader.upload(

file,

{

folder:"creatorhub/ebooks",

resource_type:"raw"

}

);

return result.secure_url;

}catch(error){

console.log("PDF Upload Error",error);

throw error;

}

};



export default cloudinary;
