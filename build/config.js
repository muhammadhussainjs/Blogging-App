import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-storage.js";

const firebaseConfig = {
  apiKey: "AIzaSyBWymrks-oF54_ONQUuzvTlypeWBEJYsRU",
  authDomain: "batch-9-minihackathon.firebaseapp.com",
  projectId: "batch-9-minihackathon",
  storageBucket: "batch-9-minihackathon.appspot.com",
  messagingSenderId: "674501373950",
  appId: "1:674501373950:web:2a70866bb4c4c0c26d1aaf",
  measurementId: "G-VSC8C295CJ"
};


export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);