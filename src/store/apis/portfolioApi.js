// api/portfolioApi.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { DB_LINK } from '../../config';
const portfolioApi = createApi({
  reducerPath: 'portfolioApi',
  baseQuery: fetchBaseQuery({ baseUrl: DB_LINK }),
  tagTypes: ['PortfolioSnapshot'],
  endpoints: (builder) => ({
    getPortfolioSnapshots: builder.query({
      query: () => '/portfolioSnapshots',
      providesTags: ['PortfolioSnapshot'],
    }),
    addPortfolioSnapshot: builder.mutation({
      query: (snapshot) => ({
        url: '/portfolioSnapshots',
        method: 'POST',
        body: snapshot,
      }),
      invalidatesTags: ['PortfolioSnapshot'],
    }),
  }),
});

export const { useGetPortfolioSnapshotsQuery, useAddPortfolioSnapshotMutation } = portfolioApi;

export { portfolioApi };
