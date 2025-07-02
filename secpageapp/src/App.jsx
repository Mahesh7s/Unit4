import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { useEffect } from 'react';
import { useRef } from 'react';

function App() {

  let [curr,setCurr] = useState(1);
  let pageRef = useRef(null);
  let [data,setData] = useState({posts:"",loading:false,error:null})
  let posts_per_page = 10;
  let last_idx=posts_per_page*curr;
  let first_idx=last_idx-posts_per_page;
  let chars = data.posts.slice(first_idx,last_idx);
  async function fetchChar(){
    setData({...data,loading:true})
    try{
      let all = [ ]
      let res = await fetch("https://rickandmortyapi.com/api/character")
    let da = await res.json()
    all=[...da.results]

let totalPages = da.info.pages;

    for (let i = 2; i <= totalPages; i++) {
      let res = await fetch(`https://rickandmortyapi.com/api/character?page=${i}`);
      let nextPageData = await res.json();
      all = [...all, ...nextPageData.results];
    }

    setData({...data,loading:false,posts:all});
    }catch(err){
      setData({...data,error:err.message});
    }
  }

useEffect(()=>{
  fetchChar();
},[])
useEffect(()=>{
  if(chars)
  pageRef.current.style.backgroundColor="grey";


},[curr])


  return (
    <>
    {chars && <h2 ref={pageRef}>current Page:{curr}</h2> }
{data.loading && <h3>Laoding.....</h3> }
{data.error && <h3>{data.error}</h3>}
<div style={{display:"grid",gridTemplateColumns:"repeat(4,2fr)"}}>
{chars && chars.map((ele,idx)=>(
  <div key={ele.id} style={{border:"2px solid",display:"flex",flexDirection:"column",alignItems:"center",margin:"10px"}}> 
    <b>{idx+1}.Title:{ele.name}</b>
    <img src={ele.image} width="100px"/>
    <b>Status:{ele.status}</b>
  </div>
))}



</div>

<button onClick={()=>setCurr(curr-1)} disabled={curr===1}>Prev</button>
<button onClick={()=>setCurr(curr+1)} disabled={curr==data.posts.length/posts_per_page}>Next</button>



     </>
  )
}

export default App
