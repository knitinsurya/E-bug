// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAW5xTGkaBsjxVWFm5Wiy7zPyCU4Fnj5wM",
  authDomain: "e-bugtracker.firebaseapp.com",
  projectId: "e-bugtracker",
  storageBucket: "e-bugtracker.firebasestorage.app",
  messagingSenderId: "288488310979",
  appId: "1:288488310979:web:d05e0203be02b041c03a76",
  measurementId: "G-L9BYJ5Z0CM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app); 
const db = getFirestore(app);
export const storage = getStorage(app);
export { db,auth };