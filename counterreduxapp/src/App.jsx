import { useState } from 'react'
import {useSelector,useDispatch} from "react-redux";
import './App.css'
import { increment,decrement } from './redux/action';

function App() {

  const count = useSelector((state)=>state.count);
  const dispatch = useDispatch();

  return (
    <>
    <h2>Counter:{count}</h2>
     <button onClick={() => dispatch(increment())}>Increment</button>
      <button onClick={() => dispatch(decrement())}>Decrement</button>
    </>
  )
}

export default App
