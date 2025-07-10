import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import logReducer from './slices/logSlice';
import streakReducer from './slices/streakSlice';
import mentorReducer from './slices/mentorSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    logs: logReducer,
    streak: streakReducer,
    mentor: mentorReducer,
  },
});