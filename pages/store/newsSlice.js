import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

export const newsSlice = createSlice({
  name: "news",
  initialState,
  reducers: {
    fetch_news: (state, action) => {
        state = [...state, action.payload];
        return state;
    },
    clear_state: (state) => {
        state = [];
        return state;
    }
  },
});

export const { fetch_news, clear_state } = newsSlice.actions;


export default newsSlice.reducer;