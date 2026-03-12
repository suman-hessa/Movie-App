import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    inputText: '',
    sortBy: '',
    yearQuery: '',
    genreQuery: ''
}

const movieSlice = createSlice({
    name: "search",
    initialState,
    reducers: {
        addSearchQuery: (state, action)=>{
            state.inputText = action.payload;
        },
        addSortQuery: (state, action)=>{
            state.sortBy = action.payload;
        },
        addYearQuery: (state, action)=>{
            state.yearQuery = action.payload;
        }, 
        addGenreQuery: (state, action)=>{
            state.genreQuery = action.payload;
        }
    }
})

export const {addSearchQuery, addSortQuery, addYearQuery, addGenreQuery} = movieSlice.actions;

export default movieSlice.reducer;