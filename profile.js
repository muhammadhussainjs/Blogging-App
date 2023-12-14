


import { onAuthStateChanged, signOut , updatePassword,} from "https://www.gstatic.com/firebasejs/10.5.2/firebase-auth.js"
import { auth, db ,  } from "./config.js"
import { collection,  query, where, getDocs,  doc , updateDoc } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-firestore.js";



const names = document.querySelector('#name')
const name1 = document.querySelector('#name1')
const img = document.querySelector('#img')
const form = document.querySelector('#form')
const oldpassword = document.querySelector('#oldpassword')
const newpassword = document.querySelector('#newpassword')
const repeatpassword = document.querySelector('#repeatpassword')

//logout function
let uid;
let pic;
onAuthStateChanged(auth, async (user) => {
    if (!user) {
        window.location = "login.html"
        return
    }
    uid = user.uid
    
    const querySnapshot = await getDocs(query(collection(db, "users"), where("uid", "==", uid)));
    querySnapshot.forEach(async (doc) => {
        console.log(doc.data());
        pic = doc.data()
        img.innerHTML = `<img src="${pic.profileurl}" alt="">`
        names.innerHTML = `${pic.firstName}`
        name1.innerHTML = `${pic.firstName}`
        
    })
    
})
        form.addEventListener('submit', (event) => {
            event.preventDefault();

                

                const user = auth.currentUser;
                if (newpassword.value !== repeatpassword.value) {
                    alert('Passwords do not match');
                    return;
                }
               

                 updatePassword( user , newpassword.value)
                .then(() => {
               
            alert('password change')
                })
        
                .catch((error) => {
                  const errorMessage = error.message;
                  console.log(errorMessage);
                });   
            }) 


logout.addEventListener('click', () => {
    signOut(auth).then(() => {
        
        window.location = "index.html"
        
        
    }).catch((error) => {
        alert("error")
    });
})




