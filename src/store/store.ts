import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { bookmarksApi } from "./apis/bookmarksApi";

// Removed authReducer and authApi since Zustand handles authentication
export const store = configureStore({
    reducer: {
        [bookmarksApi.reducerPath]: bookmarksApi.reducer,
    },
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware().concat(bookmarksApi.middleware),
});

setupListeners(store.dispatch); // Keep only if using RTK Query

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Export only necessary API hooks
export {
    useFetchBookmarksQuery,
} from "@/store/apis/bookmarksApi";
