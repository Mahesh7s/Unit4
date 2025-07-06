import { combineReducers } from "redux";
import booksReducer from "./booksReducer";
import filterReducer from "./filterReducer";

const rootReducer = combineReducers({
  books: booksReducer,
  filters: filterReducer,
});

export default rootReducer;
