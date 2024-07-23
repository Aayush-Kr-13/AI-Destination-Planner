// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBH6TXuGVwwWcxnwot0MQtDz7NzdUcuGDw",
  authDomain: "adventura-ef361.firebaseapp.com",
  projectId: "adventura-ef361",
  storageBucket: "adventura-ef361.appspot.com",
  messagingSenderId: "943455965744",
  appId: "1:943455965744:web:7e58b51f8ee45c26e913f5",
  measurementId: "G-K9ZWP1NM5V"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db=getFirestore(app);
//const analytics = getAnalytics(app);