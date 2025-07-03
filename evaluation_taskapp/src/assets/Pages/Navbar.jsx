import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
	<div style={{display:"flex",gap:"30px"}}>
	  <Link to="/tasks">Tasks</Link>
	  <Link to="/about">About</Link>
	</div>
  )
}

export default Navbar
