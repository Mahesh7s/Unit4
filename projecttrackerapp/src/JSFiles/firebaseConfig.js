// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAX4VqL2mgwkhghELL5PHH_XrGmEK-_dLo",
  authDomain: "auth-d4729.firebaseapp.com",
  projectId: "auth-d4729",
  storageBucket: "auth-d4729.firebasestorage.app",
  messagingSenderId: "539612669376",
  appId: "1:539612669376:web:360435dc93abf140e4d425",
  measurementId: "G-NSCE9DFS7L"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);