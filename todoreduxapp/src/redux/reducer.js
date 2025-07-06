let initialState={
	Tasks:[]
}

export default function tasksReducer(state=initialState,action){
	switch(action.type){
		case "ADDTASK":
			return {
        ...state,
        Tasks: [...state.Tasks, action.payload],
      }

	   case "TOGGLE":
		return{
			...state,
			Tasks: state.Tasks.map((task) =>
          task.id === action.payload     // payload = id to flip
            ? { ...task, status: !task.status }
            : task
        ),


		
	}

	   case "DELETE":
		  return {
			...state,
			Tasks : state.Tasks.filter(ele=>ele.id!==action.payload)
		  }
		default:
			return state;
	}
}