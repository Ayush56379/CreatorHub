import multer from "multer";

const storage =
multer.diskStorage({

destination:(req,file,cb)=>{

cb(null,"uploads/");

},

filename:(req,file,cb)=>{

const uniqueName =

Date.now()+"-"+file.originalname;

cb(null,uniqueName);

}

});

const fileFilter =
(req,file,cb)=>{

const allowed=[

"application/pdf",
"application/zip"

];

if(

allowed.includes(
file.mimetype

)){

cb(null,true);

}else{

cb(

new Error(
"Only PDF or ZIP allowed"
),

false

);

}

};

const upload =
multer({

storage,

fileFilter,

limits:{

fileSize:
10*1024*1024

}

});

export default upload;
