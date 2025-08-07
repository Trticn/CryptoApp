import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


export const contactApi = createApi({
  reducerPath: 'contactApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.CLIENT_URL + '/api/contact',
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