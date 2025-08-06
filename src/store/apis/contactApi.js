import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { DB_LINK } from '../../config';

export const contactApi = createApi({
  reducerPath: 'contactApi',
  baseQuery: fetchBaseQuery({
    baseUrl: DB_LINK + '/api/contact',
    credentials: 'include',
  }),
  endpoints: (builder) => ({

    sendMessage: builder.mutation({
      query: (data) => ({
        url: '/send-message',
        method: 'POST',
        body: data,
      }),
    }),
  }),
});

export const {
  useSendMessageMutation,
} = contactApi; 