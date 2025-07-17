import React from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { fetchProducts } from '../reducer/fetchProducts'
const Scourse = () => {

	let dispatch = useDispatch()
	const {data,loading,error} = useSelector((state)=>state.products)
  
	
	return (
	<div>
  <h3>Hellloooo</h3>
		{loading && <p>Loading</p>}
		{error && <p>{error}</p>}

		 	{data && data.map(ele=>(
		<>
		<div key={ele.id}>
			<h3>{ele.title}</h3>
			<p><b>Price:</b>{ele.price}</p>
			<p>Rating:{ele.rating},{ele.id}</p>
			<button onClick={()=>viewMore(ele.id)}>View More</button>

		</div>
		
		</>
	))}

	  
	</div>
  )
}

export default Scourse
