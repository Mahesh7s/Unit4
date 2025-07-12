// redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import projectReducer from "./projectSlice";
import taskReducer from "./taskSlice";

export const store = configureStore({
  reducer: {
    project: projectReducer,
    task: taskReducer,
  },
});
