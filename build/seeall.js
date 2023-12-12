
import { auth, db } from "./config.js"
import { collection, addDoc, Timestamp, query, where, getDocs, orderBy, doc, updateDoc, deleteDoc } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-firestore.js";

const maindiv = document.querySelector('#maindiv')
const login = document.querySelector('#login')
const back = document.querySelector('#back')
let arr = []



back.addEventListener('click' , ()=>{
    arr.forEach( async (item , index)=>{
        await deleteDoc(doc(db, "userclick" , arr[index]))
       console.log(item)
       window.location = "index.html"
    })
      
  

})


login.addEventListener('click' , ()=>{
    window.location = "login.html"
  })

  function renderpost() {
    maindiv.innerHTML = ''
    array.forEach((item) => {
        console.log(item);
        maindiv.innerHTML += `
        <div class="bg-[#ffffff] border-2 border-inherit mt-12 rounded-lg  mb-12  shadow-xl pl-3 sm:pl-5">
                <div class="flex flex-wrap gap-4 pt-6">
                
                 <div class="rounded-md"><img class="w-20 h-20  rounded-md" src="${item.picobj.profileurl}" alt=""></div>
<div>
                <div>

             <p class="text-2xl"> ${item.text}</p>
              </div>
              <div class="flex flex-wrap gap-3" >
               <p>${item.picobj.firstName}</p>
               <p>${item.postDate.seconds}</p> 
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



//getdocs
let postobj;
let userobj;
let array = []


async function getdatafrompost(){
    const a = await query(collection(db, "userclick")  );
    
    const querySnapshot = await getDocs(a);
    querySnapshot.forEach((doc) => {
        console.log(doc.data());
        console.log(doc.id);
        userobj = doc.data()
        console.log(userobj.arr.uid);
        arr.push(doc.id)
        console.log(arr);
        
        getDataFromuser()
       
        
    })
    
    
}
getdatafrompost()
async function getDataFromuser() {

    const q = await query(collection(db, "post") , where("uid" , "==" , userobj.arr.uid) );
    
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        console.log(doc.data());
        postobj = doc.data()
        console.log(postobj);
        array.push({ ...postobj, docid: doc.id })
        console.log(array);
        
    })
    
    renderpost()
    
    
}

