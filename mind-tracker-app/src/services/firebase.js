// Import the functions you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase, ref } from "firebase/database";

// ✅ Add databaseURL here
const firebaseConfig = {
  apiKey: "AIzaSyAn11rHgjhPnnXCrcC31Rzkta8pK1YS2-Q",
  authDomain: "mind-tracker-834b7.firebaseapp.com",
  databaseURL: "https://mind-tracker-834b7-default-rtdb.asia-southeast1.firebasedatabase.app", // ✅ FIXED
  projectId: "mind-tracker-834b7",
  storageBucket: "mind-tracker-834b7.firebasestorage.app",
  messagingSenderId: "138240013807",
  appId: "1:138240013807:web:7103034e277bbc9960f21a",
  measurementId: "G-66EFCBFHN0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getDatabase(app);
export const dbRef = ref(db);
