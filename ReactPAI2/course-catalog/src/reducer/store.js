import {configureStore} from "@reduxjs/toolkit";
import productReducer from "./fetchProducts";
export const store = configureStore({
	reducer:{
		products:productReducer,
	}
})