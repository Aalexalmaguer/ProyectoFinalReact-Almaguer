// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCVS0n1soGX_hQRT3vfxK8y7brUdIDkGDQ",
  authDomain: "proyecto-final-react-b6468.firebaseapp.com",
  projectId: "proyecto-final-react-b6468",
  storageBucket: "proyecto-final-react-b6468.firebasestorage.app",
  messagingSenderId: "99084456814",
  appId: "1:99084456814:web:6184b871935b09e3ba677f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
