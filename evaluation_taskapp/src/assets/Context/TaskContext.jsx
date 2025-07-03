import React from 'react'
import { useState } from 'react';
import { createContext } from 'react'

let TaskCon = createContext();

const TaskContext = ({children}) => {

    let [tasks,setTasks] = useState([]);
	function addTask(task){

		setTasks([...tasks,task])

	}
	function toggle(id){

		setTasks([
			...tasks.map(ele=>ele.id==id?{...ele,status:!ele.status}:ele)
		])
	}
	


  return (
	<div>
		<TaskCon.Provider value={{tasks,addTask,toggle}}>
			{children}
		</TaskCon.Provider>
	  
	</div>
  )
}
export {TaskCon};
export default TaskContext
