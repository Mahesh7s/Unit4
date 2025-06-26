import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { useEffect } from 'react';

function App() {

  const [count, setCount] = useState(0);

  return(
    <>
    <Timer time={10}/>
    </>
  )
}


function Timer({time}){
  let [idea,setIdea] = useState(time||"")
  let [count,setCount] = useState(0);
  let [running,setRunning] = useState(false)
  useEffect(()=>{
    if(running){
      let timer = setInterval(()=>{
        setCount(prev=>prev+1)
      },1000)

            return()=>clearInterval(timer)


    }

  },[running])

  function stop(){
    setRunning(false)
  }
useEffect(() => {
  if (running && count == idea) {
    setRunning(false);
    alert("Gaol is reached")    // safe: runs after render
  }
}, [count, idea, running]);


function reset(){
  setRunning(false);
  setCount(0);
}




  return(
    <>     <h3>Timer:{count}</h3>

    <input type="text" placeholder="Enter the limit:" value={idea} onChange={(e)=>setIdea(e.target.value)} /><br/>
          <button onClick={()=>setRunning(true)}>Start</button>
          <button onClick={stop}>Stop</button>
          <button onClick={reset}>Reset</button>   
    </>
  )
}

export default App
