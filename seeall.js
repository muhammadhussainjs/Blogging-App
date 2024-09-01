
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
let array = []
let arr = []



window.history.pushState({ userId: user.uid }, null, window.location.href);

// Custom Back Button
back.addEventListener('click', () => {
    localStorage.removeItem('userDetails'); // Old user data ko clear karna
    window.location = "index.html";
});

// Browser Back Button
window.onpopstate = (event) => {
    if (event.state && event.state.userId) {
        localStorage.removeItem('userDetails'); // Old user data ko clear karna
        window.location = "index.html";
    }
};

  




login.addEventListener('click' , ()=>{
    window.location = "login.html"
  })

  function renderpost() {
    maindiv.innerHTML = ''
    array.forEach((item) => {
        console.log(item);
        maindiv.innerHTML += 
        ` <div class="bg-[#ffffff] border-2 border-inherit mt-12 rounded-xl  pb-8 mb-12 shadow-xl pl-3 sm:pl-5">
        <div class="sm:flex gap-3 mt-6 ">
         <div class="rounded-md">
         <img class="w-20 h-20  rounded-md" src="${item.picobj.profileurl}" alt="">
         </div>
         <div>
         <p class="text-2xl font-semibold break-words sm:max-w-[250px] md:max-w-[350px] lg:max-w-[450px] "> ${item.text}</p>
         <div class="flex gap-1 mt-3 font-normal">
         <p>${item.picobj.firstName} - </p>
         <p>${item.postDate}</p>
         </div> 
         </div>
         </div>

         <div>   
             <p class="text-[#4d4a4a] text-[14px] font-light mt-2 whitespace-normal break-words">
         ${item.area}</p>
         </div>
         </div>
                `
    })
    
    
    
}






async function getDataFromuser() {
    array = []
    
    const q = await query(collection(db, "post") , where("uid" , "==" , user.uid) );
    
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        array.push({ ...doc.data(), docid: doc.id })
        console.log(array);
        userpic.innerHTML = `<div class="font-semibold text-1xl">
        <p class="break-words max-w-[120px] sm:max-w-[140px] lg:max-w-[240px]">${array[0].picobj.email}
        </p></div>
       <div class="font-bold text-2xl text-[#7c47f6] max-w-[120px] sm:max-w-[140px] lg:max-w-[240px] break-words "> <p>${array[0].picobj.firstName}</p></div>
      <div>  <img class="sm:w-60 rounded-md sm:h-60  w-32 h-32 " src="${array[0].picobj.profileurl}" alt="" ></div>`

        
    })
    
     renderpost()
     
    
    
}
getDataFromuser()

