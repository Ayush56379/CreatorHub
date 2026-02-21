document.addEventListener(

"DOMContentLoaded",

function(){

console.log("Script Loaded");

const btn =
document.getElementById(
"registerBtn"
);

if(!btn){

alert("Button Not Found");

return;

}

btn.onclick = async function(){

alert("Button Clicked");

const name =
document.getElementById("name").value;

const email =
document.getElementById("email").value;

const password =
document.getElementById("password").value;

try{

const result =
await registerUser({

name,
email,
password

});

alert(

JSON.stringify(result)

);

}catch(error){

alert("Backend Error");

}

};

});
