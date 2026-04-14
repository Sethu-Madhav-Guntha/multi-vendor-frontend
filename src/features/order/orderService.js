import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BASE_URI = import.meta.env.VITE_BACKEND_BASE_URI;

export const orderApi = createApi({
    reducerPath: "orderReducer",
    baseQuery: fetchBaseQuery({
        baseUrl: `${BASE_URI}/orders`,
    }),
    endpoints: (builder) => ({
        createOrder: builder.mutation({
            query: ({ items, token }) => ({
                url: `/create`,
                method: "POST",
                headers: {
                    authorization: `Bearer ${token}`
                },
                body: { items }
            })
        }),
        getCustomerOrders: builder.query({
            query: ({ token }) => ({
                url: `/`,
                method: "GET",
                headers: {
                    authorization: `Bearer ${token}`
                }
            })
        }),
        getOrderById: builder.query({
            query: ({ orderId, token }) => ({
                url: `/${orderId}`,
                method: "GET",
                headers: {
                    authorization: `Bearer ${token}`
                }
            })
        }),
        cancelOrder: builder.mutation({
            query: ({ orderId, token }) => ({
                url: `/${orderId}`,
                method: "DELETE",
                headers: {
                    authorization: `Bearer ${token}`
                }
            })
        })
    })
});

export const { useCreateOrderMutation, useGetCustomerOrdersQuery, useLazyGetCustomerOrdersQuery, useLazyGetOrderByIdQuery, useCancelOrderMutation } = orderApi;