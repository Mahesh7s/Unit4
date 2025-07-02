import { useState,useReducer } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function reducer(state,action){
  switch(action.type){
    case "INC":
      return {count:state.count+1};
      break;
    case "DEC":
      return {count:state.count-1};
      break;
    case "RESET":
      return {count:state.count=0};
      break;
      default:
      return state;
  }
}

function App() {

  const [state,dispatch] = useReducer(reducer,{count:0})
  return (
    <>
      <h2>Counter:{state.count}</h2>
      <button onClick={()=>dispatch({type:"INC"})}>Increment</button>
      <button onClick={()=>dispatch({type:"DEC"})}>DECREMENT</button>
      <button onClick={()=>dispatch({type:"RESET"})}>RESET</button>
    </>
  )
}

export default App
