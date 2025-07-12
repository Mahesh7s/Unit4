import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import useToggle from './useToggle'

function App() {
  
  let [curr,setCurr] = useToggle(["A","B","C","D"],2)

  return (
    <>
    <h3>Current Item:{curr}</h3>
    <button onClick={setCurr}>Toggle Item</button>
      
    </>
  )
}

export default App
