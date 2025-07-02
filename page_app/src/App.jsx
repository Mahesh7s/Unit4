import { useEffect, useRef, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(1)
  let [data,setData] = useState({posts:[],error:null,loading:false});
  let pageRef = useRef(null)
  let posts_per_page = 10;
  let last_idx = posts_per_page*count;
  let first_idx = last_idx-posts_per_page;
  let postsdata = data.posts.slice(first_idx,last_idx);

  async function fetchData(){

    setData({...data,loading:true});
    try{
     let res = await fetch("https://jsonplaceholder.typicode.com/todos")
     let imp = await res.json();
     setData({...data,loading:false,posts:imp});

    }
    catch(err){
      setData({...data,error:err.message});

    }




  }
  useEffect(()=>{
    fetchData();
  },[])

  useEffect(()=>{
    pageRef.current.style.backgroundColor="yellow";
  },[count])




  return (
    <>
    {data.loading && <p>Loading...</p> }
    {data.error &&  <h3>{data.error}</h3> }
                 <h2 ref={pageRef}>Page:{count}</h2>

    {

      data.posts && postsdata.map((ele,idx)=>(
        <>
        <div key={ele.id}>

          <h3>{count*idx+1}{ele.title}</h3>
        </div>
        </>
      ))
    }
    <button onClick={()=>{setCount(count-1)}} disabled={count===1}>Prev</button>
    <button onClick={()=>{setCount(count+1)}} disabled={count===(data.posts.length)/10}>Next</button>
      
    </>
  )
}

export default App
