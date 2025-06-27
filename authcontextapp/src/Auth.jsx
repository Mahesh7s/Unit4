import React from "react";
import { createContext } from "react";
import { useState } from "react";
export const AuthContext = createContext();

export default function Auth({children}){

	let [user,setUser] = useState(false);

	function handleUser(){
		setUser(prev=>!prev);
	}

	return(
		<>
		<AuthContext.Provider value={{user,handleUser}}>
			{children}
		</AuthContext.Provider>
		</>
	)
}