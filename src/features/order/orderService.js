import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { selectIsAuthenticatedUser, selectToken } from "../auth/authSelectors";

const BASE_URI = import.meta.env.VITE_BACKEND_BASE_URI;

export const orderApi = createApi({
    reducerPath: "orderApi",
    baseQuery: fetchBaseQuery({
        baseUrl: `${BASE_URI}/orders`,
        prepareHeaders: (headers, { getState }) => {
            if (selectIsAuthenticatedUser(getState())) {
                const token = selectToken(getState());
                headers.set("authorization", `Bearer ${token}`);
            }
            return headers;
        }
    }),
    endpoints: (builder) => ({
        createOrder: builder.mutation({
            query: ({ items }) => ({
                url: `/customer/create`,
                method: "POST",
                body: items
            })
        }),
        getCustomerOrders: builder.query({
            query: () => ({
                url: `/customer`,
                method: "GET"
            })
        }),
        getOrderById: builder.query({
            query: ({ orderId }) => ({
                url: `/${orderId}`,
                method: "GET"
            })
        }),
        cancelOrder: builder.mutation({
            query: ({ orderId }) => ({
                url: `/customer/${orderId}`,
                method: "DELETE"
            })
        }),
        listStoreOrders: builder.query({
            query: ({ storeId }) => ({
                url: `/store/${storeId}`,
                method: "GET"
            })
        }),
        vendorOrders: builder.query({
            query: () => ({
                url: `/vendor`,
                method: "GET"
            })
        }),
        updateOrder: builder.mutation({
            query: ({ orderId, status }) => ({
                url: `/vendor/${orderId}`,
                method: "PUT",
                body: {
                    status
                }
            })
        })
    })
});

export const { useCreateOrderMutation, useGetCustomerOrdersQuery, useLazyGetCustomerOrdersQuery, useLazyGetOrderByIdQuery, useCancelOrderMutation, useListStoreOrdersQuery, useLazyListStoreOrdersQuery, useVendorOrdersQuery, useLazyVendorOrdersQuery, useUpdateOrderMutation } = orderApi;