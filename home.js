import { onAuthStateChanged , signOut } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-auth.js"
import {auth} from "./config.js"


const logout = document.querySelector('#logout')



//login and logout function
onAuthStateChanged(auth,  (user) => {
    if (user) {
          const uid = user.uid;
          console.log(uid); } 
          else {
            window.location = "index.html"
            
          }
    });


//logout function
    logout.addEventListener('click' , ()=>{
        signOut(auth).then(() => {
            setTimeout(() => {
                window.location = "index.html"
                
            }, 2000);
            
          }).catch((error) => {
              alert("error")
          });
        })