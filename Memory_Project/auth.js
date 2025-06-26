import {auth,db } from "./firebasecongig.js"
import {createUserWithEmailAndPassword , signInWithEmailAndPassword,signOut,onAuthStateChanged  } from "https://www.gstatic.com/firebasejs/11.7.3/firebase-auth.js";
  import { doc,setDoc,getDoc,getDocs,collection,addDoc,deleteDoc,updateDoc} from "https://www.gstatic.com/firebasejs/11.7.3/firebase-firestore.js";

window.addEventListener("DOMContentLoaded",()=>{

	let signup = document.getElementById("signup")
	let login = document.getElementById("login")
	let logout = document.getElementById("logout")

	if(signup){
		signup.addEventListener("click",async ()=>{
   
			let name =document.getElementById("signupname").value;
			let email = document.getElementById("signupemail").value;
			let password = document.getElementById("signuppassword").value;
			let role = document.getElementById("userrole").value;
           try{
			let userCredentials = await createUserWithEmailAndPassword(auth,email,password)
			await setDoc(doc(db,"users",userCredentials.user.uid),{
				name,email,role,password
			})
			alert("Registered Successfully")
			window.open("login.html","_blank")
		}catch(err){
			document.getElementById("signup-msg").innerText=err.message;
		}


		})
	}

    if(login){
		login.addEventListener("click",async ()=>{
			 let name = document.getElementById("loginname").value;
			 let email = document.getElementById("loginemail").value;
			 let password=document.getElementById("loginpassword").value;

			try{
             let userCredentials =await signInWithEmailAndPassword(auth,email,password)
			 let docsnap = await getDoc(doc(db,"users",userCredentials.user.uid))
			 if(docsnap.exists){
				let docdata = docsnap.data()
				let role =docdata.role;
				if(role==="admin"){
					window.open("admin.html","_blank")
				}else{
					window.open("user.html","_blank")
				}
			 }
			}catch(err){
				document.getElementById("login-msg").innerText=err.message
			}
			
		})


	}



	if(logout){
		logout.addEventListener("click",async ()=>{
			await signOut(auth)
			window.open("login.html","_blank")
		})
	}




})


