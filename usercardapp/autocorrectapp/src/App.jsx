
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Autocorrect from './AutoCorrectApp'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Autocorrect/>
    </>
  )
}

export default App