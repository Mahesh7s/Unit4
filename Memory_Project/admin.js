import {auth,db } from "./firebasecongig.js"
import {createUserWithEmailAndPassword , signInWithEmailAndPassword,signOut,onAuthStateChanged  } from "https://www.gstatic.com/firebasejs/11.7.3/firebase-auth.js";
  import { doc,setDoc,getDoc,getDocs,collection,addDoc,deleteDoc,updateDoc} from "https://www.gstatic.com/firebasejs/11.7.3/firebase-firestore.js";

  document.getElementById("name").innerText=localStorage.getItem("userEmail");
  document.getElementById("role").innerText=localStorage.getItem("userRole")

  window.addEventListener("DOMContentLoaded",async ()=>{
 
	let currentuser=null;
	onAuthStateChanged(auth,async(user)=>{

		let userdata = await getDoc(doc(db,"users",user.uid))
		if(userdata.exists){
			let name = userdata.data().name
			let email = userdata.data().email
			let role = userdata.data().role
			document.getElementById("name").innerText=name+"__"+email
  document.getElementById("role").innerText=role
		}
		else{
			window.open("login.html","_blank")
		}

	})


  })
  