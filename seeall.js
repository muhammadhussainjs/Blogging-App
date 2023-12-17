
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
const userpic = document.querySelector('#userpic')
const allname = document.querySelector('#allname')
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
               <p>${item.date}</p>
               </div> 
               </div>
               </div>
            
    
               <div class="mt-3 mb-6">
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
        userpic.innerHTML = `<div class="font-semibold text-1xl">
        <p class="break-words">${array[0].email}
        </p></div>
       <div class="font-bold text-2xl text-[#7c47f6] "> <p>${array[0].name}</p></div>
      <div>  <img class="sm:w-60 rounded-md sm:h-60  w-32 h-32 " src="${array[0].url}" alt="" ></div>`

        
    })
    
     renderpost()
    
    
}
getDataFromuser()

