import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { LoginResponse, LoginCredentials } from "@/types/auth";
import { RegisterPayload, RegisterResponse } from "@/types/auth";
import { useAuthStore } from '@/store/authStore';

const baseQuery = fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BACKEND_API_URL + "/users",
    credentials: "include",
    prepareHeaders: (headers) => {
        const token = useAuthStore.getState().token;
        if (token) {
            headers.set("authorization", `Bearer ${token}`);
        }
        return headers;
    },
});

const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
    args,
    api,
    extraOptions
) => {
    let result = await baseQuery(args, api, extraOptions);

    if (result?.error?.status === 401) {
        const refreshResult = await baseQuery(
            { url: "refresh", method: "POST" },
            api,
            extraOptions,
        );
        if (refreshResult?.data) {
            const user = useAuthStore.getState().user;
            // Store the new token
            useAuthStore.getState().setCredentials(user!, refreshResult.data as string);
            // Retry the original query with new token
            result = await baseQuery(args, api, extraOptions);
        } else {
            useAuthStore.getState().logOut();
        }
    }

    return result;
};

export const authApi = createApi({
    baseQuery: baseQueryWithReauth,
    endpoints: (builder) => ({
        login: builder.mutation<LoginResponse, LoginCredentials>({
            query: (credentials) => ({
                url: "/login",
                method: "POST",
                body: credentials,
            }),
        }),
        register: builder.mutation<RegisterResponse, RegisterPayload>({
            query: (registerForm) => ({
                url: "/",
                method: "POST",
                body: registerForm
            })
        }),
        protected: builder.query<{ message: string }, void>({
            query: () => "protected",
        }),
    }),
});

// export const { useLoginMutation, useProtectedQuery, useRegisterMutation } = authApi;