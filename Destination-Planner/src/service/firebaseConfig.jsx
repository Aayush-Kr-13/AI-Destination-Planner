import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_KEY,
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