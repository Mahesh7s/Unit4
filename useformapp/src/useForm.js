import React from "react";

import { useState } from "react";

export const useForm = (initialValues)=>{

	let [formD,setFormD] = useState(initialValues);

	function handleChange(e){
		const {name,value} = e.target;
setFormD((prev)=>(
	{
		...prev,
		[name]:value
	}
))

		
	}
	function reset(){
	setFormD(initialValues)
}

	return {formD,handleChange,reset}

}