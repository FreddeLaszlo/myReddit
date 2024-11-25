import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { redditApi } from "../services/reddit";

export const store = configureStore({
  reducer: {
    [redditApi.reducerPath]: redditApi.reducer
  },
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware().concat(redditApi.middleware)
})

setupListeners(store.dispatch);

