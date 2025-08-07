import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


export const contactApi = createApi({
  reducerPath: 'contactApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_DB_LINK + '/api/contact',
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