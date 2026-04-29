import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { selectIsAuthenticatedUser, selectToken } from "../auth/authSelectors";

const BASE_URI = import.meta.env.VITE_BACKEND_BASE_URI;

export const outletApi = createApi({
    reducerPath: "outletApi",
    baseQuery: fetchBaseQuery({
        baseUrl: `${BASE_URI}/stores`,
        prepareHeaders: (headers, { getState }) => {
            if (selectIsAuthenticatedUser(getState())) {
                const token = selectToken(getState());
                headers.set("authorization", `Bearer ${token}`);
            }
            return headers;
        }
    }),
    endpoints: (builder) => ({
        createOutlet: builder.mutation({
            query: ({ outletInfo }) => ({
                url: "/create",
                method: "POST",
                body: outletInfo
            })
        }),
        fetchOutlets: builder.query({
            query: () => ({
                url: `/`,
                method: "GET"
            })
        }),
        fetchOutletById: builder.query({
            query: ({ outletId }) => ({
                url: `/${outletId}`,
                method: "GET"
            })
        }),
        updateOutlet: builder.mutation({
            query: ({ outletInfo }) => ({
                url: `/${outletInfo._id}`,
                method: "PUT",
                body: outletInfo
            })
        }),
        removeOutlet: builder.mutation({
            query: ({ id }) => ({
                url: `/${id}`,
                method: "DELETE"
            })
        })
    })
})

export const { useCreateOutletMutation, useFetchOutletsQuery, useFetchOutletByIdQuery, useLazyFetchOutletByIdQuery, useLazyFetchOutletsQuery, useUpdateOutletMutation, useRemoveOutletMutation } = outletApi;