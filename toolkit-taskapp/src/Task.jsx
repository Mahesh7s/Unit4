import React from 'react'
import { useState } from 'react'
import { addTask,toggleStatus,deleteTask } from './taskSlice';
import { useDispatch, useSelector } from 'react-redux';

const Task = () => {

	const tasks = useSelector((state)=>state.task.value);
	let dispatch = useDispatch()
  
	let [task,setTask] = useState({title:"",status:false});
	function handleChange(e){
 
		let {name,value,type,checked} = e.target;
		if(name=="title"){
			setTask({...task,title:value})
		}
		else{
			setTask({...task,status:e.target.checked})
		}

	}
	function handleSubmit(){
		if(task.title==="") return alert("Task is not valid")
        let onet = {...task,id:crypto.randomUUID()}
	    dispatch(addTask(onet));
		setTask({title:"",status:false});
	}


  return (
	<div>


		<input type="text" placeholder='Enter Task Title'name="title" value={task.title} onChange={handleChange} />
		<input type="checkbox" checked={task.status} name="status" onChange={handleChange} />
		<button onClick = {handleSubmit}>Add Task</button>
	     <div>
			<h3>My tasks</h3>
			{
				tasks.length>0 && tasks.map((ele)=>(
				<div>
					<h5>{ele.title}</h5>
					<p><b>Status: {ele.status?"completed":"Pending"}</b></p>
					<button onClick={()=>dispatch(toggleStatus(ele.id))}>Toggle Status</button>
					<button onClick={()=>dispatch(deleteTask(ele.id))}>Delete Task</button>
				</div>
				))
			}
		 </div>
	</div>
  )
}

export default Task
