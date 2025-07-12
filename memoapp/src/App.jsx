import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { useEffect } from 'react'
import Post from './Post'

function App() {
  const [count, setCount] = useState(0)
  let [title,setTitle] = useState("");
  let [body,setBody] = useState("")
  let [allPosts,setAllPosts] = useState([]);

  useEffect(()=>{
    let timer = setTimeout(()=>{
      setCount(prev=>prev+1)
    },1000)

    return ()=>clearTimeout(timer)
  },[count])


  function handlePost(){
    if(title==""||body=="") return alert("Enter valid details");
    let newTask = {
      id:crypto.randomUUID(),
      title,body
    }
    setAllPosts([...allPosts,newTask]);
    setTitle("");
    setBody("")
  }

  return (
    <>
    <h2>Counter: {count}</h2>
    <input type="text" placeholder='Enter Task Title:' value={title} onChange={(e)=>setTitle(e.target.value)}/>
    <input type="text" placeholder='Enter Body' value={body} onChange={(e)=>setBody(e.target.value)}/>
     <button onClick={handlePost}>Add Post</button>
    <h3>All Posts</h3>
    {allPosts.length==0 && <h3>No Posts Available</h3>}
    {allPosts && allPosts.map((post)=>(
      <>
      <Post id={post.id} title={post.title} body={post.body}/>
      </>
    ))}

      </>
  )
}

export default App
