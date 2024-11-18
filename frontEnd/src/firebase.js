// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-blog1-24d89.firebaseapp.com",
  projectId: "mern-blog1-24d89",
  storageBucket: "mern-blog1-24d89.firebasestorage.app",
  messagingSenderId: "118557253534",
  appId: "1:118557253534:web:019e96715bb7d9dfbec08f"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);