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
    },
    delete_input: (state, action) => {
      state = state.filter((item) => item.id !== action.payload);
      return state;
    }
  },
});

export const { fetch_news, clear_state } = newsSlice.actions;


export default newsSlice.reducer;