import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Home(){
	let [search,setSearch] = useState("");

let [state,setState] = useState({data:[],loading:false,error:null});
  const [originalData, setOriginalData] = useState([]);

async function fetchPosts(){

	setState({...state,loading:true})
	try{
		let res = await fetch("https://dummyjson.com/posts");
		let dat = await res.json();
		      setOriginalData(dat.posts); // store original data

		setState({...state,data:dat.posts,loading:false})
		console.log(dat)
	}
	catch(err){
		setState({...state,error:err.message});
	}
}

useEffect(()=>{
	fetchPosts();
},[])

//let filtered = []
function handleChange(e){
	let val = e.target.value;
	console.log(val)
	setSearch(val);

	let filtered = originalData.filter((ele)=> ele.title.toLowerCase().includes(val.toLowerCase()))

	setState((prev)=>({...prev,data:filtered}));
}
// useEffect(()=>{
// 	handleChange()
// },[search])





	return(
		<>

		<div>

<input type="text" placeholder="Search for a title" value={search} onChange={handleChange} />
<br />
<br />
<h3>Your Posts.....</h3>
{state.loading && <h3>Loading....</h3>}
{state.error && <h3>Error:{state.error}</h3>}
{state.data && state.data.map((ele)=>(
  <div key={ele.id}>
        <h3>{ele.title}</h3>
		<p>Likes❤️:{ele.reactions.likes}</p>
		<ul>Tags:  {ele.tags.map((el)=>(
			<>{el+"   "}</>
		))}</ul>

		<Link to={`/post/${ele.id}`}>View More</Link>


  </div>
))}


		</div>



		</>
	)
}