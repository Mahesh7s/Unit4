import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {Routes,Route} from "react-router-dom"
import Navbar from './Navbar'
import Post from './Post'
import About from './About'
import Home from './Home'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/post/:id" element={<Post/>}/>
        <Route path="/about" element={<About/>}/>
      </Routes>
    </>
  )
}

export default App
