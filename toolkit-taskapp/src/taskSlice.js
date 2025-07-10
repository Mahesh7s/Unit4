import { createSlice } from "@reduxjs/toolkit";

const taskSlice = createSlice({
  name: "tasks",
  initialState: {
    value: [],
  },
  reducers: {
    // 1. Add a new task
    addTask: (state, action) => {
      state.value.push(action.payload);
    },

    // 2. Toggle task status
    toggleStatus: (state, action) => {
state.value=[...state.value.map((ele)=>(
	ele.id===action.payload?{...ele,status:!ele.status}:ele
))]
    },
	deleteTask:(state,action)=>{
		state.value=[...state.value.filter((ele)=>ele.id!==action.payload)]
	}
  },
});

export const { addTask, toggleStatus,deleteTask } = taskSlice.actions;
export default taskSlice.reducer;
