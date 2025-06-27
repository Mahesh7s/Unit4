import React from "react";
import { useContext } from "react";
import { useState } from "react";
import { AuthContext } from "./Auth";

export default function Footer(){
	let {user} = useContext(AuthContext);
	if(user) return <h1>Welcom to user</h1>
	else return <h1>Please Log In</h1>
}