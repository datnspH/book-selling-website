import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface AuthSignup {
    email: string;
    password: string;
    name: string;
    confirmPassword: string
}
interface AuthSignin {
    email: string;
    password: string;
}
const authApi = createApi({
    reducerPath: "auth",
    baseQuery: fetchBaseQuery({
        baseUrl:"http://localhost:8000/"
    }),
    endpoints:(builder)=>(
        {
            signin: builder.mutation<{ message: string; accessToken: string; user: {} }, AuthSignin>({
                query: (user) => ({
                    url: '/api/signin',
                    method: "POST",
                    body: user,
                }),
                transformResponse: (response: unknown) => {
                    const { message, accessToken, user } = response as {
                        message: string;
                        accessToken: string;
                        user: {};
                    };
                    localStorage.setItem('accessToken', accessToken);
                    localStorage.setItem('user', JSON.stringify(user));
                    return { message, accessToken, user };
                },
            }),
            signup: builder.mutation<{ message: string, accessToken: string, user: {} },AuthSignup>({
             query:(user)=>({
                 url: 'api/signup',
                 method:"POST",
                 body:user
             })
            })
         }
    )
})
export const { useSignupMutation, useSigninMutation } = authApi;
export default authApi
