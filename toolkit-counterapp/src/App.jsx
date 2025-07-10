import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { increment,decrement,reset } from './counterslice'
import {useSelector,useDispatch} from "react-redux"

function App() {

  let count = useSelector((state)=>state.count.value);
  let dispatch = useDispatch();

  return (
   <>
   <h2>Counter:{count}</h2>;
   <button onClick={()=>dispatch(increment())}>Increment</button>
   <button onClick={()=>dispatch(decrement())} disabled={count==0}>Decrement</button>
   <button onClick={()=>dispatch(reset())}>Reset</button>

   </>
  )
}

export default App
