import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { useEffect } from 'react'

function App() {

  const [state, setState] = useState({
    data: [],
    loading: false,
    error: null
  });
  const [search, setSearch] = useState("");
  const [allUsers, setAllUsers] = useState([])

  const styles = {
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
    gap: "1rem",
    width: "100%",
    padding: "1rem",
    boxSizing: "border-box",
  },
  card: {
    border: "2px solid #ccc",
    borderRadius: "16px",
    padding: "1rem",
    backgroundColor: "#f9f9f9",
  },
};

  

  async function fetchUsers(){
    setState({...state,loading:true})
    try{
      let res= await fetch("https://jsonplaceholder.typicode.com/users");
      let users = await res.json();
      setState({...state,data:users,loading:false})
      setAllUsers(users);

    }catch(err){
      setState({...state,error:err.message})
    }
  }

  function handleChange(e){
    let value = e.target.value
    setSearch(value)
   const filtered = allUsers.filter((ele) =>
      ele.name.toLowerCase().includes(value.toLowerCase())
    );

    setState((prev) => ({ ...prev, data: filtered }));
    }



  
useEffect(()=>{
  fetchUsers()
},[])
  
 

  return (
    <>
    

        <input type="text" placeholder="search for any user"  value={search} onChange={handleChange} />

      <h2>Welcome to fetch users using useEffect hook</h2>
      {state.loading && <h3>Loading......</h3>  }
      {state.error && <h3 style={{color:"red"}}>{state.error}</h3>   }
      {state.data && <div style={styles.grid}>
        {
          state.data.map((ele)=>(
            <><div style={styles.card}>
            <h3>Name:{ele.name}</h3>
            <p><b>Email:</b>{ele.email}</p>
            <p><b>City:</b>{ele.address.city}</p>
            </div>
            </>
          ))
        }</div>}
    </>
  )
}

export default App
