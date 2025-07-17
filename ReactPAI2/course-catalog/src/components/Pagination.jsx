import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
const Pagination = ({data,page}) => {
	let curr = page;
	let navigate = useNavigate()
	
	let items_per_page=5;
    
	let last = curr*items_per_page;
	let first = last-items_per_page;
	let products = data.slice(first,last)
async function viewMore(id){
	navigate(`/course/${id}`)
}

  return (
	<>
	{products && products.map(ele=>(
		<>
		<div key={ele.id}>
			<h3>{ele.title}</h3>
			<p><b>Price:</b>{ele.price}</p>
			<p>Rating:{ele.rating},{ele.id}</p>
			<button onClick={()=>viewMore(ele.id)}>View More</button>

		</div>
		
		</>
	))}


	</>
  )
}

export default Pagination
