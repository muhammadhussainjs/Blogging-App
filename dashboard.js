import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-auth.js"
import { auth, db } from "./config.js"
import { collection, addDoc, Timestamp, query, where, getDocs, orderBy, doc, updateDoc, deleteDoc } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-firestore.js";


const logout = document.querySelector('#logout')
const text = document.querySelector('#texts')
const area = document.querySelector('#textarea')
const maindiv = document.querySelector('#maindiv')
const form = document.querySelector('#form')
const uidd = document.querySelector('#uid')
const names = document.querySelector('#name')

// Date & Time
const date = new Date();
console.log(date);

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const time = date.getTime();
console.log(time);
const monthName = months[date.getMonth()];
console.log(monthName);
const day = date.getDate();
console.log(day);
const year = date.getFullYear();
console.log(year);
const formattedDate = `${monthName} ${day}th, ${year}`;
console.log(formattedDate);


let picobj;
//login and logout function
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

            getDataFromFirestore()
        })
    }
    else {
        window.location = "index.html"

    }
});



//logout function
logout.addEventListener('click', () => {
    signOut(auth).then(() => {

        window.location = "index.html"


    }).catch((error) => {
        alert("error")
    });
})


function renderpost() {
    maindiv.innerHTML = ''
    array.forEach((item) => {
        console.log(item);
        maindiv.innerHTML += `
        <div class="bg-[#ffffff] border-2 border-inherit mt-12 rounded-xl  mb-12 shadow-xl pl-3 sm:pl-5">
        <div class=" sm:flex gap-3 mt-6 ">
         <div class="rounded-md">
         <img class="w-20 h-20  rounded-md" src="${item.picobj.profileurl}" alt="">
         </div>
         <div>
         <div>
         <p class="text-2xl font-semibold break-words  sm:max-w-[250px] md:max-w-[350px] lg:max-w-[450px] "> ${item.text}</p>
         </div>
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
         
         <div class="flex gap-4 mt-3 pb-6 text-[#b307aeed]">
         <button id="delete">Delete</button>
         <button id="edit">Edit</button>
         </div>
         </div>
 `        
         
    })
    const delet = document.querySelectorAll('#delete')
    delet.forEach((item, index) => {
        item.addEventListener('click', async () => {
            Swal.fire({
                title: "Are you sure?",
                text: "You won't to delete",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!"
              }).then(async (result) => {
                if (result.isConfirmed) {
                    await deleteDoc(doc(db, "post", array[index].docid))
                    .then(() => {
                        array.splice(index, 1)
                        renderpost()
                    })
    
                }
              });
           

        })
    })
    const edit = document.querySelectorAll('#edit')
    edit.forEach((item, index) => {
        item.addEventListener('click', async () => {
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



//adddocs
form.addEventListener('submit', async (event) => {
    event.preventDefault();
    try {
        const postObj = {
            text: text.value,
            area: area.value,
            uid: auth.currentUser.uid,
            postDate: formattedDate,
            picobj
            
        }
        const docRef = await addDoc(collection(db, "post"), postObj);
        console.log("Document written with ID: ", docRef.id);
        text.value = ""
        area.value = ""
        getDataFromFirestore()
        Swal.fire({
            title: "Enter data sucessfully",
          });

    } catch (e) {
        console.error("Error adding document: ", e);
    }
        


})


//getdocs
let array = []
async function getDataFromFirestore() {

    array = []

    const q = await query(collection(db, "post"), orderBy('postDate', 'desc'), where("uid", "==", picobj.uid));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        console.log(doc.data());
        array.push({ ...doc.data(), docid: doc.id })
        console.log(array);
    });
    renderpost()


}









