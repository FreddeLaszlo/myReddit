import { createSlice } from "@reduxjs/toolkit";


// create the slice
const searchSlice = {
    name: 'search',
    initialState: { searchFor: '', after: '' },
    reducers: {
        setSearch: (state, action) => {
            const { searchFor, after } = action.payload;
            if(searchFor && state.searchFor !== searchFor) {
                state.searchFor = searchFor;
                state.after = '';
            } else if(after) state.after = after;
            
        }
    }
};

const allSearchSlice = createSlice(searchSlice);

// selectors
export const  allSearchSelector = (state) => { return state.search; }

//actions
export const { setSearch } = allSearchSlice.actions;

//reducer
export default allSearchSlice.reducer;