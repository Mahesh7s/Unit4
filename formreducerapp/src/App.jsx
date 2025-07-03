import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { useReducer } from 'react'
let initialState = {
    email:"",password:"",isSubmit:false,
  }
function formReducer(state,action){
  switch(action.type){
    case "email":
      return {...state,email:action.payload}
    case "password":
      return {...state,password:action.payload}
    case "submit":
      return {...state,isSubmit:true};
    case "reset":
      return initialState;
      default:
        return state;   
  }

}

function App() {
  

  const [state,dispatch] = useReducer(formReducer,initialState);
 function handleSubmit(e){
 e.preventDefault();

 if(state.email=="" ||state.password=="") return alert("Enter alid details");
 dispatch({type:"submit"})
 
 }

  return (
    <>
<form onSubmit={handleSubmit}>

  <input type="email" placeholder='Enter email' value={state.email} onChange={(e)=>dispatch({type:"email",payload:e.target.value})} />
  <input type="password" placeholder="Enter your PAssword" value={state.password} onChange={(e)=>dispatch({type:"password" ,payload:e.target.value})} />
  <button type="submit">Submit</button>

  <button  type="button"onClick={()=>dispatch({type:"reset"})}>Reset</button>
</form>

{
  state.isSubmit?(<div>
    <h3>Email:{state.email}</h3>
    <h3>PAssword:{state.password}</h3>

  </div>):(
  <div>
    No Details Found
  </div>)
}
      
    </>
  )
}

export default App
