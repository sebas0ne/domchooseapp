// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore, serverTimestamp } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAa0mdNEmv-xiI_vXpZvI7pIDqxQZmd2a8",
    authDomain: "domchooseapp.firebaseapp.com",
    projectId: "domchooseapp",
    storageBucket: "domchooseapp.firebasestorage.app",
    messagingSenderId: "109717240205",
    appId: "1:109717240205:web:2c6bd9365a75ba921865c4",
    measurementId: "G-SBSJ0SSW9S"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db, serverTimestamp };
