// redux/projectSlice.js
import { createSlice } from "@reduxjs/toolkit";

const projectSlice = createSlice({
  name: "project",
  initialState: {
    projects: [],
    loading: false,
  },
  reducers: {
    setProjects: (state, action) => {
      state.projects = action.payload;
    },
    addProject: (state, action) => {
      state.projects.push(action.payload);
    },
    updateProject: (state, action) => {
      const idx = state.projects.findIndex(p => p.id === action.payload.id);
      if (idx !== -1) state.projects[idx] = action.payload;
    },
    deleteProject: (state, action) => {
      state.projects = state.projects.filter(p => p.id !== action.payload);
    },
  },
});

export const { setProjects, addProject, updateProject, deleteProject } = projectSlice.actions;
export default projectSlice.reducer;
