import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {Routes,Route} from "react-router-dom"
import Home from './Home'
import MovieDetails from './MoviDetails'

function App() {
  
  return (
    <>
    <h2>Welcome to the Move Dashboard</h2>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/movies/:movie" element={<MovieDetails/>}/>
      
    </Routes>
      
    </>
  )
}

export default App
