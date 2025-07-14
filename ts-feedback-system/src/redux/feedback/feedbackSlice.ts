import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Feedback } from './types';

interface FeedbackState {
  entries: Feedback[];
}

const initialState: FeedbackState = {
  entries: [],
};

const feedbackSlice = createSlice({
  name: 'feedback',
  initialState,
  reducers: {
    addFeedback: (state, action: PayloadAction<Feedback>) => {
      state.entries.push(action.payload);
    },
    filterByRating: (state, action: PayloadAction<number>) => {
      state.entries = state.entries.filter(f => f.rating === action.payload);
    },
    resetFeedback: (state) => {
      state.entries = [];
    }
  },
});

export const { addFeedback, filterByRating, resetFeedback } = feedbackSlice.actions;
export default feedbackSlice.reducer;
