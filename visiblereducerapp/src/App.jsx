import { useReducer, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
function reducer(state,action){
  switch(action.type){
    case "toggle":
      return {isVisible:!state.isVisible};
    default:
      return state;
  }
}
function App() {

  const [state,dispatch] = useReducer(reducer,{isVisible:false});

  return (
    <>
     {state.isVisible && <h3>HI, You toggled this message <br />Toggle again to remove me</h3>}
    <button onClick={()=>dispatch({type:"toggle"})}>Toggle Message</button>
      
    </>
  )
}

export default App
