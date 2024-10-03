import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const bookmarksApi = createApi({
  reducerPath: "bookmarks",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/api",
  }),
  endpoints(builder) {
    return {
      fetchBookmarks: builder.query({
        query: (_) => {
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
