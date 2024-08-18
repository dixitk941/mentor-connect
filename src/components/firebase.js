// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage'; // Import getStorage

const firebaseConfig = {
    apiKey: "AIzaSyCizZvKzTIkfG2Opd9auglD4j3xP4_4ESQ",

    authDomain: "mentorconnect-36696.firebaseapp.com",
  
    projectId: "mentorconnect-36696",
  
    storageBucket: "mentorconnect-36696.appspot.com",
  
    messagingSenderId: "42558296287",
  
    appId: "1:42558296287:web:bc705c361b2a7b6f6e996a"
  

};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app); // Initialize storage

export { db, auth, storage }; // Export storage