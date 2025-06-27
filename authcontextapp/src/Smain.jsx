import React from "react";
import { useContext } from "react";
import { AuthContext } from "./Auth";

export default function Smain(){

	let {user} = useContext(AuthContext);
	
	if(user) return<p>USer is Logged</p>
	else return<p>USer is not here</p>
}