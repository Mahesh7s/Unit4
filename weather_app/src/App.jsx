import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Search from './Search'
import{Routes,Route} from"react-router-dom"
import City from './City'
import Home from './Home'


function App() {
  

  return (
    <>
    
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/weather/:city" element={<City/>}/>
    </Routes>
     

    </>
  )
}

export default App
