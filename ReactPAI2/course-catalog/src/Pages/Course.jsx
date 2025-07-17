import React from 'react'
import {useState,useEffect} from "react"
import { useNavigate } from 'react-router-dom'
import axios from "axios";
import Pagination from '../components/Pagination';

const Course = () => {
	let [curr,setCurr] = useState(1)
let navigate = useNavigate();
let [products,setProducts] = useState({
	data:[],loading:false,error:null
})

let [pageP,setPageP] = useState(products.data)


let posts_perPage=5;
let PageProducts = products.data





function pagination(page){
	let index_Last = posts_perPage*page;
	let first_Index = index_Last-posts_perPage;
	let dp  = products.data.slice(first_Index,index_Last)
	setPageP([...pageP,dp])
	console.log(pageP)
}



useEffect(()=>{
     console.log(curr)
	pagination(curr)


},[curr])


async function fetchProducts(){
	setProducts({...products,loading:true})
	try{

		let res = await axios.get("https://dummyjson.com/products");
	let rem = await res.data
	setProducts({...products,loading:false,data:rem.products})
	//console.log(rem.products)

	}catch(err){
		setProducts({...products,error:err.message})
	}
}
useEffect(()=>{
	fetchProducts()
	
},[])

  return (
	<>
	<h2>All Products</h2>
	{products.loading && <p>Loading....</p>}
	{products.data && <Pagination data={products.data} page={curr}/>}
	{products.error && <p>{products.error}</p>}

	
	<div><button onClick={()=>setCurr(prev=>prev-1)}>Prev</button>
	<button onClick={()=>setCurr(prev=>prev+1)}>Next</button></div>
	
	

	
	
	</>
  )
}

export default Course
