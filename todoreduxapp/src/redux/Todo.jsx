import { useState } from "react";
import  {useSelector,useDispatch} from "react-redux";
import { addTask, deleteTask, toggle } from "./action";

const Todo = () => {

   let tasks = useSelector((state)=>state.Tasks)
   let dispatch = useDispatch()

  const [task, setTask] = useState({ title: "", status: false });

  function handleSubmit(e) {
    e.preventDefault();

    if (!task.title.trim()) {
      alert("Enter valid details");
      return;
    }

    // create a new todo item
    const item = { ...task, id: crypto.randomUUID() };
    dispatch(addTask(item))          // ← inspect or dispatch to Redux here

    // reset form fields
    setTask({ title: "", status: false });
  }

  return (
    <>
      <h2>Todo Application using Redux</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter Task Title"
          value={task.title}
          onChange={e => setTask({ ...task, title: e.target.value })}
        />

        <input
          type="checkbox"
          checked={task.status}
          onChange={e => setTask({ ...task, status: e.target.checked })}
        />

        <button type="submit">Add Task</button>
      </form>





	  <div><h3>MY TASKS</h3>
	  {tasks  && tasks.map((task)=>(
		<div key={task.id}>
			<h3>Title:{task.title}</h3>
			<p><b>Status:</b>{task.status?"Completed":"Pending"}</p>
			<button onClick={()=>dispatch(toggle(task.id))}>Mark as {task.status?"Pending":"Completed"}</button>
			<button onClick={()=>dispatch(deleteTask(task.id))}>Delete Task</button>
		</div>
	  ))}
	  </div>
    </>
  );
};

export default Todo;
