import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { DB_LINK } from '../../config';

export const secureApi = createApi({
  reducerPath: 'secureApi',
  baseQuery: fetchBaseQuery({
    baseUrl: DB_LINK + '/api/auth',
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
  }),
});

export const {
  useChangePasswordMutation,
  useChangeEmailMutation,
} = secureApi; 