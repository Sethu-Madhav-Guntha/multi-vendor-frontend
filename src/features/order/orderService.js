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
                url: `/customer/create`,
                method: "POST",
                headers: {
                    authorization: `Bearer ${token}`
                },
                body: items
            })
        }),
        getCustomerOrders: builder.query({
            query: ({ token }) => ({
                url: `/customer`,
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
                url: `/customer/${orderId}`,
                method: "DELETE",
                headers: {
                    authorization: `Bearer ${token}`
                }
            })
        }),
        listStoreOrders: builder.query({
            query: ({ storeId, token }) => ({
                url: `/store/${storeId}`,
                method: "GET",
                headers: {
                    authorization: `Bearer ${token}`
                }
            })
        }),
        vendorOrders: builder.query({
            query: ({ token }) => ({
                url: `/vendor`,
                method: "GET",
                headers: {
                    authorization: `Bearer ${token}`
                }
            })
        }),
        updateOrder: builder.mutation({
            query: ({ orderId, status, token }) => ({
                url: `/vendor/${orderId}`,
                method: "PUT",
                headers: {
                    authorization: `Bearer ${token}`
                },
                body: {
                    status
                }
            })
        })
    })
});

export const { useCreateOrderMutation, useGetCustomerOrdersQuery, useLazyGetCustomerOrdersQuery, useLazyGetOrderByIdQuery, useCancelOrderMutation, useListStoreOrdersQuery, useLazyListStoreOrdersQuery, useVendorOrdersQuery, useLazyVendorOrdersQuery, useUpdateOrderMutation } = orderApi;