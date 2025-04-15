// firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Firebase project config (copy this from Firebase console -> Project settings)
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIRESTORE_API_KEY,
    authDomain: "speciale-63108.firebaseapp.com",
    projectId: "speciale-63108",
    //storageBucket: "speciale-63108.firebasestorage.app", // This needs to be changed, if we're using storage for videos
    messagingSenderId: "972206834894",
    appId: "1:972206834894:web:aa269f9ed9955745f73c9f"
  };

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);


export { db, auth };