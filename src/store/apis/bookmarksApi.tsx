import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const bookmarksApi = createApi({
    reducerPath: "bookmarks",
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_BACKEND_API_URL,
    }),
    endpoints(builder) {
        return {
            fetchBookmarks: builder.query({
                query: () => {
                    console.log("env to: " + import.meta.env.VITE_BACKEND_API_URL)
                    console.log("env googlowe to: " + import.meta.env.VITE_GOOGLE_CLIENT_ID)
                    return {
                        url: "/bookmarks",
                    };
                },
            }),
        };
    },
});

export const { useFetchBookmarksQuery } = bookmarksApi;

export { bookmarksApi };
