
import { signInWithEmailAndPassword  ,  GoogleAuthProvider,GithubAuthProvider , signInWithPopup} from "https://www.gstatic.com/firebasejs/10.5.2/firebase-auth.js";
import { collection, addDoc  } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-firestore.js";
import {auth, db} from "./config.js"

const form = document.querySelector('#form')
const email = document.querySelector('#email')
const password = document.querySelector('#password')
const google = document.querySelector('#google')
const github = document.querySelector('#github')
const signup = document.querySelector('#signup')
const load = document.querySelector('#load')
const login = document.querySelector('#login')




eye.addEventListener('click' , ()=>{
  if(password.type == "password"){
      password.type = "text"
  }else{
      password.type = "password"
  }
})


signup.addEventListener('click' , ()=>{
  window.location = "signup.html"
})

form.addEventListener('submit' , (e)=>{
    e.preventDefault()

    login.style.display = "none"
    load.style.display = "block"

    signInWithEmailAndPassword(auth, email.value, password.value)
    .then((userCredential) => {
      const user = userCredential.user;
      window.location = "dashboard.html"
      
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      Swal.fire({
        title: "error",
      });
      
     
    }).finally(()=>{
      load.style.display = "none"
      login.style.display = "block"
    })


})

const provider = new GoogleAuthProvider();
google.addEventListener('click' , ()=>{
  console.log('google');
  signInWithPopup(auth, provider)
  .then((result) => {
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    console.log(token);
    const user = result.user;
    console.log(user);
    addDoc(collection(db , 'users'), {
      firstName: user.displayName,
      email: user.email, 
      profileurl:user.photoURL,
      uid:user.uid
    })
    .then((res) => {
      console.log(res);
      window.location = 'dashboard.html'
  }).catch((err) => {
      console.log(err);
  })
    
  }).catch((error) => {
    const errorMessage = error.message;
    console.log(errorMessage);
  });


})

const providers = new GithubAuthProvider();
github.addEventListener('click' , ()=>{
  console.log('github');

  signInWithPopup(auth, providers)
  .then((result) => {
    const credential = GithubAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    console.log(token);
    const user = result.user;
    console.log(user);
    addDoc(collection(db , 'users'), {
      firstName: user.displayName,
      email: user.email, 
      profileurl:user.photoURL,
      uid:user.uid
    })
    .then((res) => {
      console.log(res);
      window.location = 'dashboard.html'
  }).catch((err) => {
      console.log(err);
  })
  }).catch((error) => {
    const errorMessage = error.message;
    console.log(errorMessage);
  });
})

