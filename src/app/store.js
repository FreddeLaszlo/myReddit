import { configureStore } from "@reduxjs/toolkit";
import postsReducer from "../features/Posts/PostsSlice";
import subRedditsReducer from "../features/SubReddits/subRedditsSlice";
import searchReducer from "../features/Search/SearchSlice";
import commentsReducer from "../features/Comments/CommentsSlice";

export const store = configureStore({
  reducer: {
    comments: commentsReducer,
    subreddits: subRedditsReducer,
    posts: postsReducer,
    search: searchReducer,
  }
  });
