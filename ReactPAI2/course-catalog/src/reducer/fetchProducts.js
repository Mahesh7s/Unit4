import {createSlice,createAsyncThunk} from "@reduxjs/toolkit"
import axios from "axios";
export const fetchProducts = createAsyncThunk(
	"products/fetchProducts",
	async (url,{rejectWithValue}) => {
		try{
			let res = await axios.get(url);
			return res.data;

		}catch (err){
			return rejectWithValue(err.message);

		}
	} 
)

const productSlice = createSlice({
	name:"productSlice",
	initialState:{
		data:[],
		loading:false,
		error:null
	},
	reducers:{},
	extraReducers:(builder)=>{
		builder.addCase(fetchProducts.pending,(state)=>{
			state.loading=true
		})
		.addCase(fetchProducts.fulfilled,(state)=>{
			state.loading =false;
			state.data = action.payload;
		})
		.addCase(fetchProducts.rejected,(state)=>{
			state.loading=false,
			state.error=action.payload;
		})
	}
})

export default productSlice.reducer;