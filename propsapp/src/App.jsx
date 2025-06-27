import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import BottomMainRight from './BottomMainRight'

function App() {
 
       let user="Mahesh"
  return (
    <>
      <Parent user={user}/>
    </>
  )
}
function Parent({user}){
  return(
    <Child user={user}/>
  )
}
function Child({user}){
  return(
    <Gchild user={user}/>
  )
}
function Gchild({user}){
  return(
    <BottomMainRight user={user}/>
  )
}




export default App
