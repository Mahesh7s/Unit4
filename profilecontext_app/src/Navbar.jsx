import React from "react"
import { Link } from "react-router-dom"

export default function Navbar(){

	return(
		<>
		<Link to="/profile">My Profile</Link>
		<Link to="/settings">Settings</Link>
		</>
	)
}