// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {getAuth} from 'firebase/auth'
import { GoogleAuthProvider } from "firebase/auth";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "loginlms-90ba3.firebaseapp.com",
  projectId: "loginlms-90ba3",
  storageBucket: "loginlms-90ba3.firebasestorage.app",
  messagingSenderId: "579217531851",
  appId: "1:579217531851:web:9aa3e184ddfd8d9f6e8c4e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


const auth = getAuth(app)
const provider = new GoogleAuthProvider();


export {auth, provider}