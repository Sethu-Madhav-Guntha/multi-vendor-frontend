import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BASE_URI = import.meta.env.VITE_BACKEND_BASE_URI;

export const outletApi = createApi({
    reducerPath: "outletReducer",
    baseQuery: fetchBaseQuery({
        baseUrl: `${BASE_URI}/stores`
    }),
    endpoints: (builder) => ({
        createOutlet: builder.mutation({
            query: ({ outletInfo, token }) => ({
                url: "/create",
                method: "POST",
                headers: {
                    authorization: `Bearer ${token}`
                },
                body: outletInfo
            })
        }),
        fetchOutlets: builder.query({
            query: (token) => ({
                url: `/`,
                method: "GET",
                headers: {
                    authorization: `Bearer ${token}`
                }
            })
        }),
        fetchOutletById: builder.query({
            query: ({ outletId, token }) => ({
                url: `/${outletId}`,
                method: "GET",
                headers: {
                    authorization: `Bearer ${token}`
                }
            })
        }),
        updateOutlet: builder.mutation({
            query: ({ outletInfo, token }) => ({
                url: `/${outletInfo._id}`,
                method: "PUT",
                headers: {
                    authorization: `Bearer ${token}`
                },
                body: outletInfo
            })
        }),
        removeOutlet: builder.mutation({
            query: ({ id, token }) => ({
                url: `/${id}`,
                method: "DELETE",
                headers: {
                    authorization: `Bearer ${token}`
                }
            })
        })
    })
})

export const { useCreateOutletMutation, useFetchOutletsQuery, useFetchOutletByIdQuery, useLazyFetchOutletByIdQuery, useLazyFetchOutletsQuery, useUpdateOutletMutation, useRemoveOutletMutation } = outletApi;