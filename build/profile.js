


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

logout.addEventListener('click', () => {
    signOut(auth).then(() => {
        
        window.location = "index.html"
        
        
    }).catch((error) => {
        alert("error")
    });
})
onAuthStateChanged(auth, async (user) => {
    if (user) {
        let uid = user; 
        console.log(uid);
        console.log(auth);
        form.addEventListener('submit', async (event) => {
            event.preventDefault();

            const querySnapshot = await getDocs(query(collection(db, "users"), where("uid", "==", uid.uid)));
            querySnapshot.forEach(async (doc) => {
                const picobj = {
                    pass: doc.data().Password,
                    id: doc.id,
                };

                if (oldpassword.value !== picobj.pass) {
                    alert('Enter the correct old password');
                    return;
                }
                if (oldpassword.value === newpassword.value) {
                    alert('Please enter a new password');
                    return;
                }
                if (newpassword.value !== repeatpassword.value) {
                    alert('Passwords do not match');
                    return;
                }
               

                await updatePassword( user , newpassword.value)
                .then(async () => {
                  await updateDoc(doc(db, "users", picobj.id), {
                    Password: newpassword.value,
                  });
                  
                  form.reset();
                })
        
                .catch((error) => {
                  const errorMessage = error.message;
                  console.log(errorMessage);
                });   
}) 
})
}
else {
        window.location = "index.html";
    }
    });





// form.addEventListener('submit', (event) => {
//     event.preventDefault();
//     if (newpassword.value !== repeatpassword.value) {
//         alert('password are not same');
//         return
//     }
    // const user = firebase.auth().currentUser;
    // console.log(user);
    // const newPassword = getASecureRandomPassword();
    // console.log(newPassword);
    // user.updatePassword(newPassword).then(() => {
    //     alert('password change')
    // }).catch((error) => {
    //     alert(error)
        
    // });
//     const credentials = firebase.auth.EmailAuthProvider.credential(
//         user.email,
//         oldpassword
//       );
      
//       // Prompt the user to re-authenticate
//       user.reauthenticateWithCredential(credentials)
//         .then(() => {
//           // If reauthentication succeeds, update the password
//           return user.updatePassword(newpassword.value);
//         })
//         .then(() => {
//           // Password updated successfully
//           console.log('Password changed successfully!');
//         })
//         .catch((error) => {
//           // Handle errors, such as incorrect password or others
//           console.error('Error changing password:', error);
//         });
        
        
//         oldpassword.value = ''
//         repeatpassword.value = ''
//         newpassword.value = ''
  
//   })



  





