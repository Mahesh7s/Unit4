import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  let [data,setData] = useState({
    app:"",loading:false,error:null
  })
  
  async function fetchData(){
    setData({...data,loading:true})
    try{
    let res= await fetch("https://dummyjson.com/quotes/random")
    let data = await res.json();
    setData({...data,app:data,loading:false})
    }catch(err){
      setData({...data,error:err.message});
    }
    
  }
  useEffect(()=>{
      let interval = setInterval(()=>fetchData(),3000)
      return()=>
        clearInterval(interval)

  },[])

  return (
    <>
      <h2>Welcome to Quote geneartor app</h2>
      <button onClick={fetchData} disabled={data.loading}>
        {data.loading ? "Loading..." : "Get New Quote"}
      </button>
      {data.app && <div>
        <i><b>{data.app.quote}</b></i><br />
        <small><b>-</b>{data.app.author}</small>
      </div>
      }
      {data.error && <div style={{color:"red"}}>data.error</div>}

    
    </>
  )
}

export default App
