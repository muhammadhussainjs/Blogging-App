
import {createUserWithEmailAndPassword , updatePassword } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-auth.js";
import { auth, db ,  storage } from "./config.js"
import { collection, addDoc, Timestamp, query, where, getDocs, orderBy, doc, updateDoc, deleteDoc } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-firestore.js";
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-auth.js"



const names = document.querySelector('#name')
const name1 = document.querySelector('#name1')
const img = document.querySelector('#img')
const form = document.querySelector('#form')
const oldpassword = document.querySelector('#oldpassword')
const newpassword = document.querySelector('#newpassword')
const repeatpassword = document.querySelector('#repeatpassword')

//logout function
logout.addEventListener('click', () => {
    signOut(auth).then(() => {

        window.location = "index.html"


    }).catch((error) => {
        alert("error")
    });
})

let picobj;
onAuthStateChanged(auth, async (user) => {
    
    if (user) {
        const uid = user.uid;
        console.log(uid);
        const a = await query(collection(db, "users"), where("uid", "==", uid));

        const querySnapshot = await getDocs(a);
        querySnapshot.forEach((doc) => {
            picobj = doc.data()
            console.log(picobj);
            names.innerHTML = `<p>${picobj.firstName}</p>`
            name1.innerHTML = `<p>${picobj.firstName}</p>`
            img.innerHTML = `<img src="${picobj.profileurl}" class="rounded-xl" alt="" width="200px" height="200px">`
        

        
        })
    }
    else {
        window.location = "index.html"

    }
});

form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (newpassword.value !== repeatpassword.value) {
        alert('password are not same');
        return
    }
    // const user = firebase.auth().currentUser;
    // console.log(user);
    // const newPassword = getASecureRandomPassword();
    // console.log(newPassword);
    // user.updatePassword(newPassword).then(() => {
    //     alert('password change')
    // }).catch((error) => {
    //     alert(error)
        
    // });
    const credentials = firebase.auth.EmailAuthProvider.credential(
        user.email,
        oldpassword
      );
      
      // Prompt the user to re-authenticate
      user.reauthenticateWithCredential(credentials)
        .then(() => {
          // If reauthentication succeeds, update the password
          return user.updatePassword(newpassword.value);
        })
        .then(() => {
          // Password updated successfully
          console.log('Password changed successfully!');
        })
        .catch((error) => {
          // Handle errors, such as incorrect password or others
          console.error('Error changing password:', error);
        });
        
        
        oldpassword.value = ''
        repeatpassword.value = ''
        newpassword.value = ''
  
  })



  





