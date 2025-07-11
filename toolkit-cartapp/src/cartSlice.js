import {createSlice} from "@reduxjs/toolkit";

 const cartSlice = createSlice({
	name:"Cart",
	initialState:{
		items:[],
		totalPrice:0,
	},
	reducers:{
         addItem:(state,action)=>{
			state.items.push(action.payload)
			state.totalPrice+=action.payload.price
		 },
		 removeItem:(state,action)=>{
			state.items = state.items.filter((item)=> item.id!==action.payload.id)
			state.totalPrice-=action.payload.price
		 },

	}
})

 export const {addItem,removeItem} = cartSlice.actions;
 export default cartSlice.reducer;