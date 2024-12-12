import { configureStore } from "@reduxjs/toolkit";
import postsReducer from "../features/Posts/postsSlice";
import subRedditsReducer from "../features/SubReddits/subRedditsSlice"
import searchSlice from "../features/Search/SearchSlice"

export const store = configureStore({
  reducer: {
    subreddits: subRedditsReducer,
    posts: postsReducer,
    search: searchSlice
  }
  });

//setupListeners(store.dispatch);

