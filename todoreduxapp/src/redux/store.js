import tasksReducer from "./reducer";
import {createStore} from "redux"
const store = createStore(tasksReducer);
export default store;