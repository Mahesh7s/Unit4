import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {Route,Routes} from "react-router-dom";
import Tasks from './assets/Pages/Tasks';
import About from './assets/Pages/About';
import LandingPage from './assets/Pages/LandingPage';

function App() {

  return (
    <>
    <Routes>
      <Route path="/" element={<LandingPage/>}/>
      <Route path="/tasks" element={<Tasks/>}/>
      <Route path="/about" element={<About/>}/>
    </Routes>
      
    </>
  )
}

export default App
