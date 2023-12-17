// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAYN06viKNt_X67xzLgLZxGpwmcoOEq6YA",
  authDomain: "yourmove-ai.firebaseapp.com",
  projectId: "yourmove-ai",
  storageBucket: "yourmove-ai.appspot.com",
  messagingSenderId: "1095775536528",
  appId: "1:1095775536528:web:dd8baa2bd87f8867ae1f15",
  measurementId: "G-0CSVV47507",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
