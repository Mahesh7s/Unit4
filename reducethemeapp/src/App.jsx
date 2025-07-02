import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Toggle from './Toggle'

function App() {

  return (
    <>
      <h1>welcome to useReducer</h1>
      <Toggle>
        <div>
          <ul>
            <li>item1</li>
            <li>item2</li>
            <li>item3</li>
            <li>item4</li>
            <li>item5</li>
          </ul>
        </div>
      </Toggle>
    </>
  )
}

export default App
