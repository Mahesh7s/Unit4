import React from 'react'
import {useState} from "react"


const useToggle = (items,initV=0) => {

	let [ind,setInd] = useState(initV)

	function toggleItems(){
		setInd((prev)=>(prev+1)%items.length);
	}


  return [items[ind],toggleItems];
}

export default useToggle
