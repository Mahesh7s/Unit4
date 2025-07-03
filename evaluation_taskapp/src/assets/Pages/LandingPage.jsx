import React from 'react'
import Navbar from './Navbar'
import { useNavigate } from 'react-router-dom'

const LandingPage = () => {
	let navigate = useNavigate();
  return (
	<div>
	  <Navbar/>
	  <h2>Landing Page</h2>
	  <button onClick={()=>navigate("/tasks")}>Go to Tasks</button>
	</div>
  )
}

export default LandingPage
