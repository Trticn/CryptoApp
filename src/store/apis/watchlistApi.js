// api/portfolioApi.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const watchlistApi = createApi({
  reducerPath: 'watchlist',
  baseQuery: fetchBaseQuery({ baseUrl:process.env.CLIENT_URL+ '/api', credentials: 'include' }),
  tagTypes: ['Watchlist'],
  endpoints: (builder) => ({
    fetchWatchlist: builder.query({
      query: () => '/watchlist',
      providesTags: ['Watchlist'],
    }),
    addCryptoToWatchlist: builder.mutation({
      query: (crypto) => ({
        url: `/watchlist/${crypto.id}`,
        method: 'POST',
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
