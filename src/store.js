import { createSlice, configureStore } from '@reduxjs/toolkit';

// Create a slice for the data
const dataSlice = createSlice({
  name: 'data',
  initialState: null, // Initial state is null
  reducers: {
    setData: (state, action) => {
      return action.payload; // Set the payload as the state
    }
  }
});

// Export the action created by the slice
export const { setData } = dataSlice.actions;

// Configure the store
const store = configureStore({
  reducer: {
    data: dataSlice.reducer
  }
});

export default store;
