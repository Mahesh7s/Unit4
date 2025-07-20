// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCNwhZU8KNEQxtTHdW6Z_xohoeQGQLcnnA",
  authDomain: "memorylane-personal-f7418.firebaseapp.com",
  databaseURL: "https://memorylane-personal-f7418-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "memorylane-personal-f7418",
  storageBucket: "memorylane-personal-f7418.firebasestorage.app",
  messagingSenderId: "667204677280",
  appId: "1:667204677280:web:eff71479904ab592be63c5",
  measurementId: "G-W1WE7ZH7QS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const database = getDatabase(app);
export default app;