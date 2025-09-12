// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBxt7HwkDz7t9lkTWqpAsMn3wVjLIq_Zn0",
  authDomain: "devoria-57dd4.firebaseapp.com",
  projectId: "devoria-57dd4",
  storageBucket: "devoria-57dd4.firebasestorage.app",
  messagingSenderId: "169178705677",
  appId: "1:169178705677:web:60c60c84123fc95117ca44"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)