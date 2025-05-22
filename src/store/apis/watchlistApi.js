// api/portfolioApi.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const watchlistApi = createApi({
  reducerPath: 'watchlist',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://cryptoappbackend.onrender.com' }),
  tagTypes: ['Watchlist'],
  endpoints: (builder) => ({
    fetchWatchlist: builder.query({
      query: () => '/watchlist',
      providesTags: ['Watchlist'],
    }),
    addCryptoToWatchlist: builder.mutation({
      query: (crypto) => ({
        url: '/watchlist',
        method: 'POST',
        body: crypto,
      }),
      invalidatesTags: ['Watchlist'],
    }),
    removeCryptoFromWatchlist: builder.mutation({
      query: (crypto) => ({
        url: `/watchlist/${crypto.id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Watchlist'],
    }),
  }),
});

export const {
  useFetchWatchlistQuery,
  useAddCryptoToWatchlistMutation,
  useRemoveCryptoFromWatchlistMutation,
} = watchlistApi;

export { watchlistApi };
