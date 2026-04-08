import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BASE_URI = import.meta.env.VITE_BACKEND_BASE_URI;

export const authApi = createApi({
    reducerPath: "authenticationReducer",
    baseQuery: fetchBaseQuery({
        baseUrl: `${BASE_URI}/auth`
    }),
    endpoints: (builder) => ({
        register: builder.mutation({
            query: (userInfo) => ({
                url: "/signup",
                method: "POST",
                body: userInfo
            })
        }),
        login: builder.mutation({
            query: (credentials) => ({
                url: "/login",
                method: "POST",
                body: credentials
            })
        }),
        userDetails: builder.query({
            query: (token) => ({
                url: "/user",
                method: "GET",
                headers: {
                    "authorization": `Bearer ${token}`
                }
            })
        })
    })
});

export const { useRegisterMutation, useLoginMutation, useUserDetailsQuery } = authApi;