import React from "react"
import {useState} from"react"
import { useNavigate } from "react-router-dom"


export default function Home(){

	let [movie,setMovie] = useState("")
	let navigate = useNavigate();
 	function handleSearch(){
        navigate(`/movies/${movie}`)
	}

	return(
		<>
		<input type="text" placeholder="Search for a movie" value={movie} onChange={(e)=>setMovie(e.target.value)} />
		<button onClick={handleSearch}>Search</button>
		</>
	)

}