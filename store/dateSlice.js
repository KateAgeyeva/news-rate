import { createSlice } from '@reduxjs/toolkit';

const initialState = {start: new Date().toDateString(), end: new Date().toDateString()};

export const dateSlice = createSlice({
    name: "date",
    initialState,
    reducers: {
      choose_date: (state, action) => {
          state = {start: action.payload.start, end: action.payload.end};
          return state;
      }
    },
  });
  
  export const { choose_date, clear_date } = dateSlice.actions;
  
  
  export default dateSlice.reducer;