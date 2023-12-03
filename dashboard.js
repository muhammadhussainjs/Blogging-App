import { onAuthStateChanged , signOut } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-auth.js"
import {auth , db} from "./config.js"
import { collection, addDoc , Timestamp, query, getDocs, orderBy  , doc, updateDoc,  deleteDoc} from "https://www.gstatic.com/firebasejs/10.5.2/firebase-firestore.js";


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
        console.log(uid);
    } 
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
        
        
        let array = []
        function renderpost(){
            maindiv.innerHTML = ''
            array.forEach((item)=>{
                console.log(item);
                maindiv.innerHTML +=
                `<div  class="card  bg-base-100 shadow-xl mt-4"><p><span class="text-xl">TITLE: </span>${item.text}</p> 
                <p><span class="text-xl" >DESCRIPTION: </span>${item.area}</p>
                <p><span class="text-xl" >POSTDATE: </span>${item.postDate.seconds}</p>
                <div class="flex gap-4">
                <button id="delete">Delete</button>
                <button id="edit">Edit</button>
                </div>
                </div>`
            })
            const delet = document.querySelectorAll('#delete')
           delet.forEach((item , index)=>{
               item.addEventListener('click' , async ()=>{
                await deleteDoc(doc(db, "post", array[index].docid))
                .then(()=>{
                    array.splice(index, 1)
                renderpost()
            })

            })
           })
           const edit = document.querySelectorAll('#edit')
           edit.forEach((item , index)=>{
            item.addEventListener('click' , async()=>{
                console.log('edit');
                const updatedTitle = prompt('enter new Title');
                const updateddescription = prompt('enter new description');
        await updateDoc(doc(db, "post", array[index].docid), {
          text: updatedTitle,
          area: updateddescription
        });
        array[index].text = updatedTitle;
        array[index].area = updateddescription;
        renderpost()

    })
            })
           
           
        }
        renderpost()
        
       
       //adddocs
        form.addEventListener('submit', async (event) => {
            event.preventDefault();
            try {
                const postObj = {
                    text: text.value,
                    area: area.value,
                    uid: auth.currentUser.uid,
                    postDate: Timestamp.fromDate(new Date()),
                    
                }
                const docRef = await addDoc(collection(db, "post"), postObj);
                console.log("Document written with ID: ", docRef.id);
               
            } catch (e) {
                console.error("Error adding document: ", e);
            }

            text.value = ""
            area.value = ""
        })


//getdocs
async function getDataFromFirestore() {
         array = []
           
        const q = await query(collection(db, "post"), orderBy('postDate', 'desc') );
        
        const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                console.log(doc.data());
                array.push({...doc.data() , docid : doc.id})
                console.log(array);
            });
            renderpost()
       
        
        }
        getDataFromFirestore()








