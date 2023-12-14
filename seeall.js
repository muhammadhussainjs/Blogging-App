
import { auth, db } from "./config.js"
import { collection, addDoc, Timestamp, query, where, getDocs, orderBy, doc, updateDoc, deleteDoc } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-firestore.js";

const users = localStorage.getItem('userDetails')
let userDetails = JSON.parse(users)
let user;
user = userDetails[0];
console.log(user.uid);

const maindiv = document.querySelector('#maindiv')
const login = document.querySelector('#login')
const back = document.querySelector('#back')
let arr = []



back.addEventListener('click' , ()=>{
   
       window.location = "index.html"
    })
      
  




login.addEventListener('click' , ()=>{
    window.location = "login.html"
  })
  let array = []

  function renderpost() {
    maindiv.innerHTML = ''
    array.forEach((item) => {
        console.log(item);
        maindiv.innerHTML += `
        <div class="bg-[#ffffff] border-2 border-inherit mt-12 rounded-lg  mb-12  shadow-xl pl-3 sm:pl-5">
                <div class="flex flex-wrap gap-4 pt-6">
                
                 <div class="rounded-md"><img class="w-20 h-20  rounded-md" src="${item.url}"
                 alt=""></div>
<div>
                <div>

             <p class="text-2xl"> ${item.text}</p>
              </div>
              <div class="flex flex-wrap gap-3" >
               <p>${item.name}</p>
               </div> 
               </div>
               </div>
            
    
               <div class="mt-3">
                <p>${item.area}</p>
                </div>
               
                </div>
                `
    })
    
    
    
}






async function getDataFromuser() {
    
    const q = await query(collection(db, "post") , where("uid" , "==" , user.uid) );
    
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        array.push({ ...user, docid: doc.id })
        console.log(array);
        
    })
    
     renderpost()
    
    
}
getDataFromuser()

