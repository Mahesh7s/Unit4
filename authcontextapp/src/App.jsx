import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { useContext } from 'react'
import { AuthContext } from './Auth'
import Smain from './Smain'
import Footer from './Footer'

function App() {
  let {user,handleUser} = useContext(AuthContext);
  

  return (
    <>

    <button onClick={handleUser}>{user?"Logout":"Login"}</button>
    <Smain/>
    <Footer/>
      
    </>
  )
}

export default App
