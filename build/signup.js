import {createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-auth.js";

import {auth ,db , storage} from "./config.js"

import { collection, addDoc } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-firestore.js";
import { ref, uploadBytes, getDownloadURL } from 'https://www.gstatic.com/firebasejs/10.5.2/firebase-storage.js'


const form = document.querySelector('#form')
const firstname = document.querySelector('#fname')
const lastname = document.querySelector('#lname')
const email = document.querySelector('#email')
const password = document.querySelector('#password')
const repeatpassword = document.querySelector('#rpassword')
const img = document.querySelector('#img')
const signin = document.querySelector('#signin')

signin.addEventListener('click' , ()=>{
  window.location = "index.html"
})





form.addEventListener('submit' , (event)=>{
    event.preventDefault()
    if(password.value === repeatpassword.value){
    createUserWithEmailAndPassword(auth, email.value, password.value)
  .then((userCredential) => {
    const user = userCredential.user;
    console.log(user);
    window.location = "index.html"
        })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorMessage)
  });
}else{
    alert('enter correct password')
}
firstname.value = ""
lastname.value = ""
email.value = ""
  password.value = ""
  repeatpassword.value = ""

})