import {createUserWithEmailAndPassword , updateProfile } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-auth.js";

import {auth ,db , storage} from "./config.js"

import { collection, addDoc} from "https://www.gstatic.com/firebasejs/10.5.2/firebase-firestore.js";
import { ref, uploadBytes, getDownloadURL } from 'https://www.gstatic.com/firebasejs/10.5.2/firebase-storage.js'


const form = document.querySelector('#form')
const firstname = document.querySelector('#fname')
const lastname = document.querySelector('#lname')
const email = document.querySelector('#email')
const password = document.querySelector('#password')
const repeatpassword = document.querySelector('#rpassword')
const img = document.querySelector('#img')
const signin = document.querySelector('#signin')
const load = document.querySelector('#load')
const signup = document.querySelector('#signup')


signin.addEventListener('click' , ()=>{
  window.location = "login.html"
})





form.addEventListener('submit', (event) => {
    event.preventDefault();

    if(firstname.value == ''){
        Swal.fire({
            title: "please enter your name",
        });
        return
    }
    if (password.value !== repeatpassword.value) {
        Swal.fire({
            title: "password are not same",
        });
        return
    }
    let file = img.files[0]
 if(!file){
    Swal.fire({
        title: "please enter photo",
      });
    return
}

const storageRef = ref(storage, email.value);
uploadBytes(storageRef, file).then(() => {
    getDownloadURL(storageRef).then((url) => {
        createUserWithEmailAndPassword(auth, email.value, password.value)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log(user);
             signup.style.display = "none"
                load.style.display = "block"
                    Swal.fire({
                        title: "Signup sucessfully",
                      });
                    addDoc(collection(db, "users"), {
                        firstName: firstname.value,
                        lastName: lastname.value,
                        email: email.value,
                        uid: user.uid,
                        profileurl: url
                    }).then((res) => {
                        console.log(res);
                        window.location = "login.html"
                    }).catch((err) => {
                        console.log(err);

                        alert(err)
                     })
                    .finally(()=>{
                        load.style.display = "none"
                        signup.style.display = "block"
                      })
                })
            })
            .catch((error) => {
                const errorMessage = error.message;
                alert(errorMessage)
                console.log(errorMessage);
            });
        })
        
        .catch((error) => {
            const errorMessage = error.message;
            Swal.fire({
                title: "errorMessage",
              });
            console.log(errorMessage);
        });
        // email.value = ''
        // password.value = ''
        // repeatpassword.value = ''
        // firstname.value = ''
        // lastname.value = ''
  
  })