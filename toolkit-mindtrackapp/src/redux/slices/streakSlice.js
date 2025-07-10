import { createSlice } from '@reduxjs/toolkit';

const streakSlice = createSlice({
  name: 'streak',
  initialState: { currentStreak: 0, heatmap: {} },
  reducers: {
    updateStreak(state, action) {
      state.currentStreak = action.payload;
    },
    setHeatmap(state, action) {
      state.heatmap = action.payload;
    }
  }
});

export const { updateStreak, setHeatmap } = streakSlice.actions;
export default streakSlice.reducer;
