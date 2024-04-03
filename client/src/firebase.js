// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-blog-e910c.firebaseapp.com",
  projectId: "mern-blog-e910c",
  storageBucket: "mern-blog-e910c.appspot.com",
  messagingSenderId: "879648419135",
  appId: "1:879648419135:web:e4c430b1476ff5a6d8b78a",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);