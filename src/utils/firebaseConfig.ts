import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { collection, getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyCizZvKzTIkfG2Opd9auglD4j3xP4_4ESQ",

  authDomain: "mentorconnect-36696.firebaseapp.com",

  projectId: "mentorconnect-36696",

  storageBucket: "mentorconnect-36696.appspot.com",

  messagingSenderId: "42558296287",

  appId: "1:42558296287:web:bc705c361b2a7b6f6e996a"
};

const app = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(app);
export const firebaseDB = getFirestore(app);

export const usersRef = collection(firebaseDB, "users");
export const meetingsRef = collection(firebaseDB, "meetings");
