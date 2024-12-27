import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchData } from "../../api/redditApi";

export const loadComments = createAsyncThunk(
    "commnents/fetch",
    async (arg, { getState }) => {
        const state = getState();
        return fetchData(state.comments.url, state.comments.search, state.comments.after);
    }
);

const sliceOptions = {
    name: "comments",
    initialState: {
        postId: '',
        url: '',
        data: [],
        after: '',
        search: '',
        isLoading: false,
        hasError: false,
        hasLoaded: false
    },
    reducers: {
        setUrl: (state, action) => {
            state.url = action.payload;
            state.data = [];
            state.search = '';
            state.after = '';
            console.log(`CommentsSlice.setCommentsUrl.url: ${state.url}`);
        },
        setSearch: (state, action) => {
            state.after = '';
            state.data = [];
            state.search = action.payload;
            hasLoaded = false;
        },
        setAfter: (state, action) => {
            state.after = action.payload
        },
        setPostId: (state, action) => {
            state.postId = action.payload;
            state.url = '';
            state.data = [];
            state.search = '';
            state.after = '';
            state.hasLoaded = false;
        }

    },
    extraReducers: (builder) => {
        // Load comments
        builder
            .addCase(loadComments.pending, (state) => {
                state.isLoading = true;
                state.hasError = false;
            })
            .addCase(loadComments.fulfilled, (state, action) => {
                state.isLoading = false;
                state.hasError = false;
                console.log(action.payload);
                if (action.payload !== false) {
                    state.data.push(...action.payload[1].data.children);
                    state.after = action.payload[1].data.after;
                    state.hasLoaded = true;
                }
                
            })
            .addCase(loadComments.rejected, (state, action) => {
                state.isLoading = false;
                state.hasError = true;
            })
    },
};

export const allCommentsSlice = createSlice(sliceOptions);

export const fetchComment = (state, id) => {
    const result =  state.comments.data.filter((info) => info.data.id === id);
    return result[0].data;
}

export const { setSearch, setAfter, setUrl, setPostId } = allCommentsSlice.actions;

export default allCommentsSlice.reducer;
