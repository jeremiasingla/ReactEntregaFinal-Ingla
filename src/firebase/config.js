// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCPnqX0S4DBU1qtK79-Q7al3J1t34AOmzo",
  authDomain: "hellstar-jeremiasingla.firebaseapp.com",
  projectId: "hellstar-jeremiasingla",
  storageBucket: "hellstar-jeremiasingla.appspot.com",
  messagingSenderId: "959113635239",
  appId: "1:959113635239:web:db3cf71ebe8c5ed528c282",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
