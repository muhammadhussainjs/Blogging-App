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





form.addEventListener('submit', (event) => {
  event.preventDefault();
  if (password.value !== repeatpassword.value) {
      alert('password are not same');
      return
  }
  const file = img.files[0]
  const storageRef = ref(storage, firstname.value);
  uploadBytes(storageRef, file).then(() => {
      getDownloadURL(storageRef).then((url) => {
          createUserWithEmailAndPassword(auth, email.value, password.value)
              .then((userCredential) => {
                  const user = userCredential.user;
                  console.log(user);
                  addDoc(collection(db, "users"), {
                      firstName: firstname.value,
                      lastName: lastname.value,
                      email: email.value,
                      uid: user.uid,
                      profileUrl: url
                  }).then((res) => {
                      console.log(res);
                      window.location = 'index.html'
                  }).catch((err) => {
                      console.log(err);
                  })
              })
      })
          .catch((error) => {
              const errorMessage = error.message;
              console.log(errorMessage);
          });
  })

      .catch((error) => {
          const errorMessage = error.message;
          console.log(errorMessage);
      });
      // email.value = ''
      // password.value = ''
      // repeatpassword.value = ''
      // firstname.value = ''
      // lastname.value = ''

})