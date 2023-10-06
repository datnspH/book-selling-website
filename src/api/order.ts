import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const OrderApi = createApi({
    reducerPath: 'order',
    tagTypes: ['cart'],
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:8000/api"
    }),
    endpoints: (builder) => ({
        getCarts: builder.query<any, void>({
            query: () => ("/cart"),
            providesTags: ['cart']
          
        }),
        getCartById: builder.query<any, number | string>({
            query: (id) => `/cart/${id}`,
            providesTags: ['cart']
        }),
        removeCart: builder.mutation<void, number>({
            query: (id) => ({
                url: `/cart/${id}`,
                method: "DELETE"
            }),
            invalidatesTags: ['cart']
        }),
        addOrder: builder.mutation<any, any>({
            query: (product) => ({
                url: `/create/${product.user}`,
                method: "POST",
                body: product
            }),
            invalidatesTags: ['cart']
        }),
        // updateCart: builder.mutation<any, any>({
        //     query: (product) => ({
        //         url: `/cart/${product.id}`,
        //         method: "PATCH",
        //         body: product
        //     }),
        //     invalidatesTags: ['cart']
        // })
    })
})

export const {
     useGetCartsQuery,
     useGetCartByIdQuery,
    useRemoveCartMutation,
    useAddOrderMutation } = OrderApi
export const OrderReducer = OrderApi.reducer
export default OrderApi