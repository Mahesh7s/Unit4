import React from 'react'
import { useReducer } from 'react'
function themeReducer(state,action){
	switch(action.type){
		case "Toggle":
			 return {
        theme: state.theme === "light" ? "dark" : "light"
      };
		break;
		default:
			return state;
	}
}

const Toggle = ({children}) => {

	const[state,dispatch] = useReducer(themeReducer,{theme:"light"})

  return (
	<div>

		<button onClick={()=>dispatch({type:"Toggle"})}>Toggle Theme</button>
		<p>Current theme :{state.theme}</p>
		<div style={{backgroundColor:state.theme=="light"?"white":"grey",color:state.theme==="light"?"grey":"white"}}> {children}</div>
	  
	</div>
  )
}

export default Toggle
