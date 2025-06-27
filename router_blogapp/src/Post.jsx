import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function Post(){
       
	let {id} = useParams();


	let [post,setPost] = useState({postItem:"",loading:false,error:null});
	async function fetchData(){

		setPost({...post, loading:true})
		try{
			let res = await fetch(`https://dummyjson.com/posts/${id}`)
			let dat = await res.json();
			setPost({...post,postItem:dat,loading:false})

		}catch(err){
			setPost({...post,error:err.message})
		}

	}

	useEffect(()=>{
		fetchData()
	},[])

	return(
		<>
	
		<h3>{id}</h3>
		{post.loading && <h3>Loading.......</h3>}
		{post.error && <h3>Error:{post.error}</h3>}
		{post.postItem && <div>
			
			<h2>{post.postItem.title}</h2>
			<p>{post.postItem.body}</p>
			<b>No of Views:{post.postItem.views}</b>
			<p><b>Likes:{post.postItem.reactions.likes}</b></p>


			
			</div>}
		</>
	)
}