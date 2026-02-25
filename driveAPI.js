const API_URL =
"https://script.google.com/macros/s/AKfycbz_5CJPDBUTQgVEGaFcmQYQ9DK70CxVvvvS9CyVtxKvQC-SUI0RRQzMEsGMIdK_DMok/exec";


// LOAD DATABASE

async function getDB(db){

const res = await fetch(

API_URL+"?db="+db

);

return await res.json();

}


// SAVE DATABASE

async function saveDB(db,data){

await fetch(

API_URL,{

method:"POST",

body:JSON.stringify({

db:db,

data:data

})

});

}
