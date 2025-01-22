import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { RootState } from "@/store";
import { LoginResponse, LoginCredentials, User } from "@/types/auth";
import { setCredentials, logOut } from "@/reducers/authSlice";
import { RegisterPayload, RegisterResponse } from "@/types/register";
const baseQuery = fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BACKEND_API_URL + "/users",
    credentials: "include",
    prepareHeaders: (headers, { getState }) => {
        const token = (getState() as RootState).auth.token;
        if (token) {
            console.log("Token is present, set header with bearer");

            headers.set("authorization", `Bearer ${token}`);
        } else {
            console.log("NO TOKEN FOUND :(");
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
        // Try to get a new token
        console.log("trying to get new token");
        const refreshResult = await baseQuery(
            { url: "refresh", method: "POST" },
            api,
            extraOptions,
        );
        if (refreshResult?.data) {
            const user = (api.getState() as RootState).auth.user as User;
            // Store the new token
            api.dispatch(
                setCredentials({ user, token: refreshResult.data as string }),
            );
            // Retry the original query with new token
            result = await baseQuery(args, api, extraOptions);
        } else {
            api.dispatch(logOut());
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

export const { useLoginMutation, useProtectedQuery, useRegisterMutation } = authApi;
