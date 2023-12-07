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



let picobj = {}
//login and logout function
onAuthStateChanged(auth, async (user) => {
    array = []
    if (user) {
        const uid = user.uid;
        console.log(uid);
        const a = await query(collection(db, "users"), where("uid", "==", uid));

        const querySnapshot = await getDocs(a);
        querySnapshot.forEach((doc) => {
            console.log(doc.data());
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
        maindiv.innerHTML += `<div class="bg-[#ffffff] border-2 border-inherit mt-12 rounded-lg  mb-12  shadow-xl pl-5">
                <div class="flex flex-wrap gap-4 pt-6">
                 <div class="rounded-md"><img class="w-20 h-20  rounded-md" src="${picobj.profileurl}" alt=""></div>
<div>
                <div>

             <p class="text-2xl"> ${item.text}</p>
              </div>
              <div class="flex flex-wrap gap-3" >
               <p>${picobj.firstName}</p>
               <p>${item.postDate.seconds}</p> 
               </div> 
               </div>
               </div>
            
    
               <div class="mt-3">
                <p>${item.area}</p>
                </div>
            
                <div class="flex gap-4 mt-3 pb-6">
                <button id="delete">Delete</button>
                <button id="edit">Edit</button>
                </div>
                </div>
                `
    })
    const delet = document.querySelectorAll('#delete')
    delet.forEach((item, index) => {
        item.addEventListener('click', async () => {
            await deleteDoc(doc(db, "post", array[index].docid))
                .then(() => {
                    array.splice(index, 1)
                    renderpost()
                })

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
            postDate: Timestamp.fromDate(new Date()),

        }
        const docRef = await addDoc(collection(db, "post"), postObj);
        console.log("Document written with ID: ", docRef.id);
        text.value = ""
        area.value = ""
        getDataFromFirestore()

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









