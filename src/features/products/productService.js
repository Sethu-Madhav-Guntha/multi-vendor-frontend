import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BASE_URI = import.meta.env.VITE_BACKEND_BASE_URI;

export const productApi = createApi({
    reducerPath: "productReducer",
    baseQuery: fetchBaseQuery({
        baseUrl: `${BASE_URI}/products`
    }),
    endpoints: (builder) => ({
        createProduct: builder.mutation({
            query: ({ productInfo, token }) => ({
                url: `/create`,
                method: "POST",
                headers: {
                    authorization: `Bearer ${token}`
                },
                body: productInfo
            })
        }),
        updateProduct: builder.mutation({
            query: ({ productInfo, token }) => ({
                url: `/${productInfo._id}`,
                method: "PUT",
                headers: {
                    authorization: `Bearer ${token}`
                },
                body: productInfo
            })
        }),
        fetchProductById: builder.query({
            query: ({ productId, token }) => ({
                url: `/${productId}`,
                method: "GET",
                headers: {
                    authorization: `Bearer ${token}`
                }
            })
        }),
        removeProduct: builder.mutation({
            query: ({ productId, token }) => ({
                url: `/${productId}`,
                method: "DELETE",
                headers: {
                    authorization: `Bearer ${token}`
                }
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