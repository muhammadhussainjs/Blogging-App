import { onAuthStateChanged , signOut } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-auth.js"
import {auth , db} from "./config.js"
import { collection, addDoc , Timestamp, query, getDocs, orderBy } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-firestore.js";


const logout = document.querySelector('#logout')
const text = document.querySelector('#texts')
const area = document.querySelector('#textarea')
const maindiv = document.querySelector('#maindiv')
const form = document.querySelector('#form')
const uidd = document.querySelector('#uid')




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
        
                window.location = "index.html"
                
            
          }).catch((error) => {
              alert("error")
          });
        })        

//adddocs
        form.addEventListener('submit', async (event) => {
            event.preventDefault();
            try {
                const postObj = {
                    text: text.value,
                    area: area.value,
                    uid: auth.currentUser.uid,
                    postDate: Timestamp.fromDate(new Date())
                }
                const docRef = await addDoc(collection(db, "post"), postObj);
                console.log("Document written with ID: ", docRef.id);
               
            } catch (e) {
                console.error("Error adding document: ", e);
            }
        })


//getdocs
        async function getDataFromFirestore() {
            const q = await query(collection(db, "post"), orderBy('postDate', 'desc'));
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                console.log(doc.data());
            });
        
        
        }
        getDataFromFirestore()








