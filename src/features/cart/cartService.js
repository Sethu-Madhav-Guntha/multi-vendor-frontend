import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BASE_URI = import.meta.env.VITE_BACKEND_BASE_URI;

export const cartApi = createApi({
  reducerPath: "cartReducer",
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URI}/cart`,
  }),
  endpoints: (builder) => ({
    addToCart: builder.mutation({
      query: ({ productId, token }) => ({
        url: `/add`,
        method: "POST",
        headers: {
          authorization: `Bearer ${token}`,
        },
        body: { productId, quantity: 1 },
      }),
    }),
    cartItems: builder.query({
      query: ({ token }) => ({
        url: `/`,
        method: "GET",
        headers: {
          authorization: `Bearer ${token}`,
        },
      }),
    }),
    removeItem: builder.mutation({
      query: ({ productId, token, removeAll }) => ({
        url: `/remove/${productId}`,
        method: "DELETE",
        headers: {
          authorization: `Bearer ${token}`,
        },
        body: {
          removeAll
        }
      }),
    }),
    clearCart: builder.mutation({
      query: ({token})=>({
        url:`/clear`,
        method: "DELETE",
        headers: {
          authorization: `Bearer ${token}`
        }
      })
    })
  }),
});

export const {
  useAddToCartMutation,
  useCartItemsQuery,
  useLazyCartItemsQuery,
  useRemoveItemMutation,
  useClearCartMutation
} = cartApi;
