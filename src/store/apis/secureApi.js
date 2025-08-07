import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


export const secureApi = createApi({
  reducerPath: 'secureApi',
  baseQuery: fetchBaseQuery({
    baseUrl:  process.env.DB_LINK + '/api/auth',
    credentials: 'include',
  }),
  endpoints: (builder) => ({
    changePassword: builder.mutation({
      query: (data) => ({
        url: '/change-password',
        method: 'POST',
        body: data,
      }),
    }),
    changeEmail: builder.mutation({
      query: (data) => ({
        url: '/change-email',
        method: 'POST',
        body: data,
      }),
    }),

    forgotPassword: builder.mutation({
      query: (data) => ({
        url: '/forgot-password',
        method: 'POST',
        body: data,
      }),
    }),
    resetPassword: builder.mutation({
      query: (data) => ({
        url: '/reset-password',
        method: 'POST',
        body: data,
      }),
    }),
    // Endpoint za verifikaciju mejla, odgovara funkciji verifyEmail u backendu
    verifyEmail: builder.mutation({
      query: (token) => ({
        url: `/verify-email?token=${encodeURIComponent(token)}`,
        method: 'GET',
      }),
    }),
  }),
});

export const {
  useChangePasswordMutation,
  useChangeEmailMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useVerifyEmailMutation
} = secureApi; 