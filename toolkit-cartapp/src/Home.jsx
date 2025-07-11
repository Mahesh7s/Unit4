import React from "react";
import { useState } from "react";
import {useSelector,useDispatch} from "react-redux";
import { addItem } from "./cartSlice";

import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function Home(){
	let navigate = useNavigate()
        
	let dispatch = useDispatch();

	let [products,setProducts] = useState({
		data:[],loading:false,error:null
	})



	useEffect(()=>{
		fetchData()
	},[])

async function fetchData(){
	setProducts({...products,loading:true})
	try{
let res= await fetch("https://fakestoreapi.com/products");
	let dat = await res.json();
	setProducts({...products,data:dat,loading:false,error:null})
	}
	catch(err){

		setProducts({...products,loading:false,error:err.message})

	}
	
}

{products.loading && <h3>Loading.....</h3>
{products.error && <h3>{products.error}</h3>}
}


function handleCart(item){

	dispatch(addItem(item))
	

}

	return(
		<>
		<h1>Explore the Products....</h1>   
		<button onClick={()=>navigate("/cart")}>View Cart</button>
		{products.data && <div style={{width:"90%",margin:"auto",gap:"30px", display:"flex", flexWrap:"wrap", justifyContent:"center",alignItems:"center",  border:"2px solid"}}>
			{
				products.data.map((item)=>(
					<div key={item.id} style={{border:"2px solid", padding:"10px",width:"20%" , marginTop:"10px", height:"350px",}}>
						<img src={item.image}  width="90px"/>
                         <h3>{item.title}</h3>
						 <p>{item.category}</p>
						 <p>Price:{item.price}</p>
						 <button onClick={()=>handleCart(item)}>Add to cart</button>

						</div>
				))
			}
		</div>

		}

		</>
	)
}