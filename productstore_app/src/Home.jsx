import React from "react";
import {useState,useEffect} from "react"
import { Link } from "react-router-dom";

export default function Home(){


	let [filter,setFilters] = useState({
		sort:"Sort By",filter:"all"
	})

	let [data,setData] = useState({
		products:[],loading:false,error:null
	})


	function handleChange(e){
		let {name,value} = e.target;

		setFilters({...filter,[name]:value});
		


	}

	function filterAndSort(){
		let filtered = [...data.products]
		if(!filter.sort || !filter.filter) return alert("Not a avalid filter")
		 filtered = filtered.filter((ele)=>{
	         if(filter.filter==="all") return true;
			 else return filter.filter===ele.category.toLowerCase()
		})
		filtered.sort((a,b)=>{
			if (filter.sort === "Sort By") return;

			if(filter.sort==="high") return b.price-a.price;
			else return a.price-b.price;
		})
		
setAllData(filtered)
		
	}
	useEffect(() => {
  filterAndSort();
}, [filter.sort,filter.filter,data.products]);




	let [allData,setAllData] = useState([]);

	async function fetchProducts(){
		setData({...data,loading:true})
		try{
           let res = await fetch("https://dummyjson.com/products");
		let dat = await res.json();
		console.log(dat)
		setData({...data,loading:false,products:dat.products})
		setAllData(dat.products)
		}
		catch(err){
			setData({...data,error:err.message})
		}
	}
 useEffect(()=>{
	fetchProducts();
 },[])

return(
	<>

<div>
	<select name="filter" value={filter.filter} onChange={handleChange}>Filter By
		<option value="all">ALL</option>
		<option value="beauty">Beauty</option>
		<option value="groceries">Groceries</option>
		<option value="fragrances">Fragrances</option>
		<option value="furniture">Furniture</option>
	</select>
	<select name="sort" value={filter.sort} onChange={handleChange}>Sort By
		<option value="Sort By">Sort By</option>
		<option value="low">low-high</option>
		<option value="high">high-low</option>
	</select>
</div>

      {data.loading && <h3>Loading.....</h3>}
	  {data.error && <h3>Error:{data.error}</h3>}
	  {allData.length>0 && <div>
		{
			allData.map((ele)=>(
				<div key={ele.id}>
					<h3>{ele.title}</h3>
					<p>{ele.description}</p>
					<p>category:{ele.category}</p>
					<p><b>Price:</b>{ele.price}</p>
					<Link to={`/product/${ele.id}`}>View More</Link>
				</div>
			))
		}
		</div>}


	</>
)

}
