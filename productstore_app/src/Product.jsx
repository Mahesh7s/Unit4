import React from "react"
import {useState,useEffect} from "react"
import { useNavigate, useParams } from "react-router-dom"

export default function Product(){
	let [data,setData] = useState("")

	let {id} = useParams();
	async function fetchData(){
      let res = await fetch(`https://dummyjson.com/products/${id}`);
	  let dat = await res.json()
	  setData(dat)
	}

	useEffect(()=>{
		fetchData();
	},[])


	return(
		<>
		{!data && <h3>Something error happen</h3>}
		{data && <div>
			<h3>{data.title}</h3>
			</div>}
		</>
	)

}