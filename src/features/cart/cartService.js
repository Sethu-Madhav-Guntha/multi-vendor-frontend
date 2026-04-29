import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { selectIsAuthenticatedUser, selectToken } from "../auth/authSelectors";

const BASE_URI = import.meta.env.VITE_BACKEND_BASE_URI;

export const cartApi = createApi({
  reducerPath: "cartApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URI}/cart`,
    prepareHeaders: (headers, { getState }) => {
      if (selectIsAuthenticatedUser(getState())) {
        const token = selectToken(getState());
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    }
  }),
  endpoints: (builder) => ({
    addToCart: builder.mutation({
      query: ({ productId, sellingPrice }) => ({
        url: `/add`,
        method: "POST",
        body: { productId, quantity: 1, sellingPrice },
      }),
  }),
  cartItems: builder.query({
    query: () => ({
      url: `/`,
      method: "GET",
    }),
  }),
    removeItem: builder.mutation({
      query: ({ productId, removeAll }) => ({
        url: `/remove/${productId}`,
        method: "DELETE",
        body: {
          removeAll
        }
      }),
    }),
      clearCart: builder.mutation({
        query: () => ({
          url: `/clear`,
          method: "DELETE"
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
