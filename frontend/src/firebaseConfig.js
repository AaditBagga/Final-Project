// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCw11XWFNUwftGq2l1RjcZ8tBX88thgu1I",
  authDomain: "nbad-final-project.firebaseapp.com",
  projectId: "nbad-final-project",
  storageBucket: "nbad-final-project.appspot.com",
  messagingSenderId: "1059451733251",
  appId: "1:1059451733251:web:9f738e67893df56c145536",
  measurementId: "G-WKDVVLHCWT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);