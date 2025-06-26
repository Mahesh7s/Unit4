import {auth,db } from "./firebasecongig.js"
import {createUserWithEmailAndPassword , signInWithEmailAndPassword,signOut,onAuthStateChanged  } from "https://www.gstatic.com/firebasejs/11.7.3/firebase-auth.js";
  import { doc,setDoc,getDoc,getDocs,collection,addDoc,deleteDoc,updateDoc} from "https://www.gstatic.com/firebasejs/11.7.3/firebase-firestore.js";

  document.getElementById("name").innerText=localStorage.getItem("userEmail");
  document.getElementById("role").innerText=localStorage.getItem("userRole")