import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {Routes,Route} from "react-router-dom"
import Home from './Home'
import ProfileContext from './ProfileContext'
import Settings from './Settings'

function App() {
 

  return (
    <>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/profile" element={<ProfileContext/>}/>
      <Route path="/settings" element={<Settings/>}/>

    </Routes>
      
    </>
  )
}

export default App
