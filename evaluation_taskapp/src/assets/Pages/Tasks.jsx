import React from 'react'
import { useState } from 'react';
import { TaskCon } from '../Context/TaskContext';
import { useContext } from 'react';
import { useRef } from 'react';
import { use } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Tasks = () => {
 let styles={
	input:{
		margin:"20px",
		padding:"10px",
		border:"2px solid",
		borderRadius:"20px",
		fontFamily:"sans-serif",
		fontWeight:"bold",

	},
	button:{
         backgroundColor:"brown",
		 color:"white",
	}
	,divGrid:{
		display:"grid",
		gridTemplateColumns:"repeat(2,2fr)",
	}
 }



	let navigate =useNavigate();

	 let inputRef = useRef(null)
	 let [completed,setCompleted] = useState(0)

	const {tasks,addTask,toggle} = useContext(TaskCon);

let [taskItem,setTaskItem] = useState({
		title:"",description:"",status:false
	})
   let total = tasks.length;


	function summary(){
		let totalTasks = tasks.length;
		let com = [...tasks].filter(ele=>ele.status)
setCompleted(com.length)	}

function handleSubmit(e){
	e.preventDefault();
	if(!taskItem.title || !taskItem.description) return alert("Invaild details")
	let newtask = {...taskItem,id:crypto.randomUUID()}
addTask(newtask)



setTaskItem({
		title:"",description:"",status:false
	})
    //console.log(newtask)

	
}

useEffect(()=>{
	//if(input)
	inputRef.current.focus()
	summary()
	//textRef.current.focus()
},[tasks])


  return (
	<div><h1>Tasks Page</h1>

	<button onClick={()=>navigate("/")} style={styles.button}>Go Back</button>
<div style={{display:"flex",flexDirection:"column",justifyContent:"space-around"}}>
<form onSubmit={handleSubmit}>
		<input type="text"style={styles.input} ref={inputRef} name="title" value={taskItem.title} required onChange={(e)=>setTaskItem({...taskItem,title:e.target.value})} placeholder='Enter Task Title' />
		<div><textarea  style={styles.input} name="description"  value={taskItem.description} onChange={(e)=>setTaskItem({...taskItem,description:e.target.value})} placeholder='Enter Task Decsription' rows={10} cols={20}></textarea></div>
		<label>	Is Completed:	<input type="checkbox" name="status" value={taskItem.status}  onChange={(e)=>setTaskItem({...taskItem,status:e.target.checked})}/>
</label><br />

       <button type='submit' style={styles.button} disabled={taskItem.title==""}>Add Task</button>
		


	</form>

</div>
	
     { <div>
		<h6>Tasks Summary</h6>
		<p><b>{completed} of {tasks.length} is Completed.</b></p>
		</div>}

       <h2>My Tasks....</h2>

	{tasks.length==0 && <h3>No tasks yet! Add one to get started.</h3> }
	<div>
		{
		tasks.length>0 && tasks.map((task,idx)=>(

			<div key={idx} style={{border:"2px solid",margin:"20px",borderRadius:"10px",padding:"5px"}}>
				<h5>Title:{task.title}</h5>
				<p><b>Description:</b>{task.description}</p>
				<p ><b>Status: </b><span style={{textDecoration:task.status?"line-through":""}}>{task.status?"Completed":"Not Completed"}</span></p>
				<button onClick={()=>toggle(task.id)} style={styles.button}>Toggle Status</button>
				</div>
		))
	}
	</div>
	  
	</div>
  )
}


export default Tasks
