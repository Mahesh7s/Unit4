
  import { initializeApp } from "https://www.gstatic.com/firebasejs/11.7.3/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.7.3/firebase-analytics.js";
  import { getAuth } from "https://www.gstatic.com/firebasejs/11.7.3/firebase-auth.js";
  import { getFirestore} from "https://www.gstatic.com/firebasejs/11.7.3/firebase-firestore.js";
  
  const firebaseConfig = {
    apiKey: "AIzaSyD1b4puAFCycGRX70UnxBxwtxYnbQ3XbPA",
    authDomain: "memesproject-18f0c.firebaseapp.com",
    projectId: "memesproject-18f0c",
    storageBucket: "memesproject-18f0c.firebasestorage.app",
    messagingSenderId: "380673154842",
    appId: "1:380673154842:web:3285c3349bfe0a058056a3",
    measurementId: "G-WYFPQ8Q8C0"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
  export const auth = getAuth(app);
  export const db = getFirestore(app);
