import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const CartApi = createApi({
    reducerPath: 'cart',
    tagTypes: ['cart'],
    baseQuery: fetchBaseQuery({
        baseUrl: " http://localhost:8000/api"
    }),
    endpoints: (builder) => ({
        GetCarts: builder.query<any, number | string>({
            query: (id) => `/cart/${id}`,
            providesTags: ['cart']
        }),
        removeCart: builder.mutation<void, number>({
            query: (id) => ({
                url: `/cart/${id}/remove/`,
                method: "DELETE"
            }),
            invalidatesTags: ['cart']
        }),
        addCart: builder.mutation<any, any>({
            query: (CartItem) => ({
                url: `/cart`,
                method: "POST",
                body: CartItem
            }),
            invalidatesTags: ['cart']
        })
    })
})

export const {
     useGetCartsQuery,
    useRemoveCartMutation,
    useAddCartMutation } = CartApi
export const CartReducer = CartApi.reducer
export default CartApi
