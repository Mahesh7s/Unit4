import React, { useContext } from "react";
import { ThemeContext } from "./ThemeContext";

export default function Card(){
	let {theme} = useContext(ThemeContext)

	return(
		<>
		<div style={{width:"300px",height:"300px",backgroundColor:theme==="light"?"pink":"gray",color:theme=="light"?"gray":"aliceblue",border:"2px solid"}}>
			<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic labore id deserunt, unde porro fugit adipisci at. Accusamus dolores harum ipsa voluptatum fugiat pariatur, ab sed, iure, explicabo vero laborum sint eligendi deserunt iste vitae earum dignissimos libero dolorem. Temporibus exercitationem magnam deserunt vitae ut sit reprehenderit sunt. Atque, cupiditate!</p>

		</div>
		</>
	)
}