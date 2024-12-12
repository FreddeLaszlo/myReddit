import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchData } from "../../api/redditApi";


export const loadSubReddits = createAsyncThunk(
    "subreddits/fetch",
    async (arg, { getState }) => {
        const state = getState();
        return fetchData('/subreddits', state.subreddits.search, state.subreddits.after);
    }
);

const sliceOptions = {
    name: "subreddits",
    initialState: {
        data: [],
        after: '',
        search: '',
        isLoading: false,
        hasError: false,
        hasLoaded: false
    },
    reducers: {
        setSearch: (state, action) => {
            state.after = '';
            state.data = [];
            state.hasLoaded = false;
            state.search = action.payload;
        },
        setAfter: (state, action) => {
            state.after = action.payload
        }
    },
    extraReducers: (builder) => {
        // Load subreddits
        builder
            .addCase(loadSubReddits.pending, (state) => {
                state.isLoading = true;
                state.hasError = false;
            })
            .addCase(loadSubReddits.fulfilled, (state, action) => {
                state.isLoading = false;
                state.hasError = false;
                if (action.payload !== false) {
                    state.data.push(...action.payload.children);
                    state.after = action.payload.after;
                    state.hasLoaded = true;
                }
            })
            .addCase(loadSubReddits.rejected, (state) => {
                state.isLoading = false;
                state.hasError = true;
            })
    },
};

export const allSubRedditsSlice = createSlice(sliceOptions);

export const fetchSubReddit = (state, id) => {
    const result =  state.subreddits.data.filter((info) => info.data.id === id);
    return result[0] ? result[0].data : false;
}
export const { setSearch, setAfter } = allSubRedditsSlice.actions;

export default allSubRedditsSlice.reducer;
