import { configureStore } from "@reduxjs/toolkit";
import dateSlice from "./dateSlice";
import newsReducer from './newsSlice';

const store = configureStore({
    reducer: { 
        news: newsReducer,
        date: dateSlice
    }
});

export default store;