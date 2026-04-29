import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { selectIsAuthenticatedUser, selectToken } from "../auth/authSelectors";

const BASE_URI = import.meta.env.VITE_BACKEND_BASE_URI;

export const productApi = createApi({
    reducerPath: "productApi",
    baseQuery: fetchBaseQuery({
        baseUrl: `${BASE_URI}/products`,
        prepareHeaders: (headers, { getState }) => {
            if (selectIsAuthenticatedUser(getState())) {
                const token = selectToken(getState());
                headers.set("authorization", `Bearer ${token}`);
            }
            return headers;
        }
    }),
    endpoints: (builder) => ({
        createProduct: builder.mutation({
            query: ({ productInfo }) => ({
                url: `/create`,
                method: "POST",
                body: productInfo
            })
        }),
        updateProduct: builder.mutation({
            query: ({ productInfo }) => ({
                url: `/${productInfo._id}`,
                method: "PUT",
                body: productInfo
            })
        }),
        fetchProductById: builder.query({
            query: ({ productId }) => ({
                url: `/${productId}`,
                method: "GET",
            })
        }),
        removeProduct: builder.mutation({
            query: ({ productId }) => ({
                url: `/${productId}`,
                method: "DELETE",
            })
        }),
        fetchAllProducts: builder.query({
            query: () => ({
                url: "/",
                method: "GET"
            })
        })
    })
})

export const { useCreateProductMutation, useUpdateProductMutation, useFetchProductByIdQuery, useLazyFetchProductByIdQuery, useFetchAllProductsQuery, useRemoveProductMutation, useLazyFetchAllProductsQuery } = productApi;