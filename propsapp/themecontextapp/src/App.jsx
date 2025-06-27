import { useContext, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { ThemeContext } from './ThemeContext'
import Card from './Card'

function App() {

  let {theme,toggleTheme} = useContext(ThemeContext);

  
  

  return (
    <><div style={{width:"100%",backgroundColor:theme=="light"?"white":"black"}}>
    <button onClick={toggleTheme}>Change Theme</button>
      <p>{theme}</p>
      <Child/>
      <Card/>
      </div>
    </>
  )
}

function Child(){
	let {theme} = useContext(ThemeContext)
	console.log(theme)
}

export default App
