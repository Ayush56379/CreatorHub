async function handleRegister(){

const name =
document.getElementById("name").value;

const email =
document.getElementById("email").value;

const password =
document.getElementById("password").value;

const response =
await registerUser({

name,
email,
password

});

alert(response.message);

}
