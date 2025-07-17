import React, { useEffect, useState } from 'react'
import { useNavigate,useParams } from 'react-router-dom'

const Landing = () => {

	let {id} = useParams();
    let [data,setData] = useState({dat:{},loading:false,error:null})

	async function fetchItem(){
		setData({...data,loading:true})
		try{
		let res = await fetch(`https://dummyjson.com/products/${id}`)
		let rem = await res.json();
		setData({...data,dat:rem,loading:false})
		console.log(rem)
		}
		catch(err){
			setData({...data,error:err.message})
		}
	}
	useEffect(()=>{
		fetchItem()
	},[])




  return (
	<div>
		<h3>Your Product is here</h3>
		{data.loading && <p>Loading</p>}
		{data.dat && <div><h3>{data.dat.title}</h3>
		<b>Price:{data.dat.price}</b>
		</div>}
		{data.error && <p>{data.error}</p>}
	  
	</div>
  )
}

export default Landing
