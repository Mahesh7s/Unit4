import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {Routes,Route} from "react-router-dom"
import Product from './Product'
import Home from './Home'

function App() {
  

  return (
    <>
      <h1>WELCOME TO PRODUCT STORE APP</h1>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/product/:id" element={<Product/>}/>
      </Routes>

    </>
  )
}

export default App
