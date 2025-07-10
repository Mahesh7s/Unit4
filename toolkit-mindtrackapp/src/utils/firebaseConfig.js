import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getDatabase } from 'firebase/database';
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCNh7hmxQ37rSObMQvad03EwDCfErDdP3U",
  authDomain: "snacks-45e95.firebaseapp.com",
  databaseURL: "https://snacks-45e95-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "snacks-45e95",
  storageBucket: "snacks-45e95.firebasestorage.app",
  messagingSenderId: "1082533124056",
  appId: "1:1082533124056:web:d9d163bee6db10286144ad",
  measurementId: "G-QCZDMM7956"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const rtdb = getDatabase(app);