// api/portfolioApi.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { DB_LINK } from '../../config';
const watchlistApi = createApi({
  reducerPath: 'watchlist',
  baseQuery: fetchBaseQuery({ baseUrl: DB_LINK + '/api', credentials: 'include' }),
  tagTypes: ['Watchlist'],
  endpoints: (builder) => ({
    fetchWatchlist: builder.query({
      query: () => '/watchlist',
      providesTags: ['Watchlist'],
      // Očekuje array objekata {id: string}
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
