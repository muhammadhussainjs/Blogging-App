import { app } from "./config.js"
import { getAuth , sendPasswordResetEmail  } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-auth.js";

const form = document.querySelector('#form')


form.addEventListener('submit' ,  (e)=>{
    e.preventDefault()
    const email = document.querySelector('#email')
    const auth = getAuth(app);

    sendPasswordResetEmail(auth, email.value)
      .then(() => {
        alert('password reset')
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorMessage)
      });
})