import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { db } from '../../utils/firebaseConfig';
import { collection, getDocs, addDoc, doc, setDoc } from 'firebase/firestore';

export const fetchLogs = createAsyncThunk('logs/fetchLogs', async (uid) => {
  const logsRef = collection(db, 'dailyLogs', uid, 'logs');
  const snapshot = await getDocs(logsRef);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
});

const logSlice = createSlice({
  name: 'logs',
  initialState: { dailyLogs: [], loading: false },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLogs.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchLogs.fulfilled, (state, action) => {
        state.dailyLogs = action.payload;
        state.loading = false;
      });
  }
});

export default logSlice.reducer;