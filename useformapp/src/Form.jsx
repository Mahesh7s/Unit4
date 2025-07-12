import React from "react";

import { useForm } from "./useForm";

export  default function Form(){

	function handleSubmit(){
		if(formD.email==""|| formD.password=="") return alert("No valid");
		console.log(formD.email,formD.password)
		reset()
	}

	const {formD,handleChange,reset} = useForm({email:"",password:""});

	return(
		<>
		<h2>Form Data</h2>
		<input type="text"name="email" placeholder="enter Email" value={formD.email} onChange={handleChange} />
		<input type="text" placeholder="enter password" name="password" value={formD.password} onChange={handleChange}  />
		<button onClick={handleSubmit}>Submit</button>
		</>
	)

}