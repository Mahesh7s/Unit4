import React from "react";

import { addItem,removeItem } from "./cartSlice";
import {useDispatch,useSelector} from "react-redux"
import { useEffect } from "react";

export default function Cart(){

    

	let dispatch = useDispatch()
	let cartItems = useSelector((state)=>state.cart.items)
	let total = useSelector((state)=>state.cart.totalPrice)
	useEffect(() => {
  console.log("Cart updated:", cartItems);
}, [cartItems]);

	return (
		<>
		<h1>Shopping Cart application using redux toolkit</h1>
		<h3>Add items into the cart</h3>

		<h2>Total Price:{total}</h2>
		{
			cartItems.map((item)=>(
				<div key={item.id} style={{display:"flex",justifyContent:"center",alignItems:"center", marginBottom:"10px",gap:"20px", border:"2px orange solid",borderRadius:"10px",padding:"10px"}}>
					<h4>{item.title}</h4>
					<b>Price:{item.price}</b>
					<button style={{backgroundColor:"orange"}} onClick={()=>dispatch(removeItem(item))}>Remove from Cart</button>


				</div>
			))
		}
	
		</>
	)
}