import { configureStore } from "@reduxjs/toolkit";
import movieReducer from './movieSlice.js'

const store = configureStore({
    reducer: {
        movie: movieReducer
    }
})

export default store;