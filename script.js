document.addEventListener(

"DOMContentLoaded",

()=>{

const btn =
document.getElementById(
"registerBtn"
);

if(btn){

btn.addEventListener(

"click",

async()=>{

const name =
document.getElementById(
"name"
).value;

const email =
document.getElementById(
"email"
).value;

const password =
document.getElementById(
"password"
).value;


try{

const response =
await registerUser({

name,
email,
password

});

alert(

JSON.stringify(response)

);

}catch(e){

alert(

"Error Connecting Backend"

);

}

}

);

}

}
);
