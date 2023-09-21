// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD-tcscHGWkfNYxXI_g2kZk37Xfm_YOfik",
  authDomain: "task3frontend.firebaseapp.com",
  projectId: "task3frontend",
  storageBucket: "task3frontend.appspot.com",
  messagingSenderId: "1080204237585",
  appId: "1:1080204237585:web:fcdb669233cf957407cab0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)

export default app