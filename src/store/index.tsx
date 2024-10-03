import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { bookmarksApi } from "./apis/bookmarksApi"

export const store = configureStore({
    reducer: {
        [bookmarksApi.reducerPath]: bookmarksApi.reducer,
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware().concat(bookmarksApi.middleware);
    }
})

setupListeners(store.dispatch);

export {
    useFetchBookmarksQuery,
} from "./apis/bookmarksApi";
