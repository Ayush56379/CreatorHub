// CreatorHub API Service

const API_URL =
"https://creatorhub-f2fe.onrender.com/api";


// REGISTER

async function registerUser(data){

const res =
await fetch(API_URL + "/auth/register",{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify(data)

});

return res.json();

}


// LOGIN

async function loginUser(data){

const res =
await fetch(API_URL + "/auth/login",{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify(data)

});

return res.json();

}


// PRODUCTS

async function getProducts(){

const res =
await fetch(API_URL + "/products");

return res.json();

}
