import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { bookmarksApi } from "./apis/bookmarksApi";
import { authApi } from "./apis/authApi";
import authReducer from "@/reducers/authSlice";

export const store = configureStore({
  reducer: {
    [bookmarksApi.reducerPath]: bookmarksApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(bookmarksApi.middleware);
  },
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export { useFetchBookmarksQuery } from "./apis/bookmarksApi";

export { useLoginMutation, useProtectedQuery } from "@/store/apis/authApi";
export { login, logout } from "@/reducers/authSlice";
