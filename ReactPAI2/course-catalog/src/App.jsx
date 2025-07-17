import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Route,Routes } from 'react-router-dom'
import Landing from './Pages/Landing'
import Course from './Pages/Course'

function App() {
  

  return (
    <>
      <h1>Welcome to Course Catalogue</h1>
     <Routes>
      <Route path="/" element={<Course/>}/>
      <Route path="/course/:id" element={<Landing/>}/>
     </Routes>


    </>
  )
}

export default App
