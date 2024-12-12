import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchData } from "../../api/redditApi";

export const loadPosts = createAsyncThunk(
    "posts/fetch",
    async (arg, { getState }) => {
        const state = getState();
        return fetchData(state.posts.url, state.posts.search, state.posts.after);
    }
);

const sliceOptions = {
    name: "posts",
    initialState: {
        url: '',
        data: [],
        after: '',
        search: '',
        isLoading: false,
        hasError: false,
    },
    reducers: {
        setUrl: (state, action) => {
            state.url = action.payload;
            state.data = [];
            state.search = '';
            state.after = '';
        },
        setSearch: (state, action) => {
            state.after = '';
            state.data = [];
            state.search = action.payload;
        },
        setAfter: (state, action) => {
            state.after = action.payload
        }
    },
    extraReducers: (builder) => {
        // Load posts
        builder
            .addCase(loadPosts.pending, (state) => {
                state.isLoading = true;
                state.hasError = false;
            })
            .addCase(loadPosts.fulfilled, (state, action) => {
                state.isLoading = false;
                state.hasError = false;
                if (action.payload !== false) {
                    state.data.push(...action.payload.children);
                    state.after = action.payload.after;
                }
            })
            .addCase(loadPosts.rejected, (state) => {
                state.isLoading = false;
                state.hasError = true;
            })
    },
};

export const allPostsSlice = createSlice(sliceOptions);

export const fetchPost = (state, id) => {
    const result =  state.posts.data.filter((info) => info.data.id === id);
    return result[0].data;
}

export const { setSearch, setAfter, setUrl } = allPostsSlice.actions;

export default allPostsSlice.reducer;
