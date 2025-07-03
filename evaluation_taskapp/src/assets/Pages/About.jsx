import React from 'react'
import { useNavigate } from 'react-router-dom'

const About = () => {
	let navigate = useNavigate();
  return (
	<div>
		<button onClick={()=>navigate("/tasks")}>  Go to Tasks </button>
		<h1>About us page</h1>
		<p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ea consectetur cum repudiandae eius laudantium dignissimos et sequi eligendi minus saepe quod fuga optio delectus asperiores vero voluptatibus vel dolores voluptate laborum nihil, incidunt tenetur laboriosam! Iste placeat eos cumque reiciendis eaque et maiores. Voluptates earum possimus error nostrum numquam eos, odit quisquam explicabo excepturi tenetur alias natus neque ex, aliquid at ut repudiandae incidunt nihil in minus culpa laborum! Eius vero reiciendis nihil magnam, iusto animi delectus quis sequi. Culpa et odio, numquam aut, eligendi ullam quas consequuntur cupiditate quis voluptatum quod, accusamus exercitationem provident aliquam dolorum? Explicabo, minus quaerat.</p>
		<h3>This is about page of tasks page</h3>

	  
	</div>
  )
}

export default About
