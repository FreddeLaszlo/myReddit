import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const redditApi = createApi({
    reducerPath: 'redditApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://www.reddit.com' }),
    endpoints: (builder) => ({
        getSubReddits: builder.query({
            query: (after) => (after && after.length!==0) ? `/subreddits.json?after=${after}` : '/subreddits.json',
            keepUnusedDataFor: 60,
            serializeQueryArgs: ({ endpointName }) => {
                return endpointName
            },
            transformResponse: (response) => response.data,
            // Always merge incoming data to the cache entry
            merge: (currentCache, newItems) => {
                currentCache.after = newItems.after;
                currentCache.children.push(...newItems.children);
            },
            // Refetch when the after arg changes
            forceRefetch({ currentArg, previousArg }) {
                return currentArg !== previousArg
            },
        })
    })
})

export const { useGetSubRedditsQuery } = redditApi;
