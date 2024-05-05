// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "investment-portal-38d13.firebaseapp.com",
  projectId: "investment-portal-38d13",
  storageBucket: "investment-portal-38d13.appspot.com",
  messagingSenderId: "345616533769",
  appId: "1:345616533769:web:2303b2675be229507c6bd8"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);