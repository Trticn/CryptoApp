import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_LINK } from '../../config';
const cryptoListingApi = createApi({
  reducerPath: 'crypto',
  baseQuery: fetchBaseQuery({
    baseUrl: API_LINK,
  }),

  endpoints(builder) {
    return {
      fetchPopularCrypto: builder.query({
        query: () => '/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1',
        keepUnusedDataFor: 60,
        providesTags: ['PopularTransactions'],
      }),

      fetchSearchedCrypto: builder.query({
        async queryFn(arg, _queryApi, _extraOptions, fetchWithBQ) {
          const searchResult = await fetchWithBQ(`search?query=${arg}`);
          if (searchResult.error) return { error: searchResult.error };

          const ids = searchResult.data.coins.map((coin) => coin.id).join(',');
          if (!ids) return { data: [] };

          const pricesResult = await fetchWithBQ(
            `coins/markets?vs_currency=usd&ids=${ids}&sparkline=false`,
          );
          if (pricesResult.error) return { error: pricesResult.error };

          return { data: pricesResult.data };
        },
      }),

      fetchCryptoCollection: builder.query({
        query: (ids) => `/coins/markets?vs_currency=usd&ids=${ids}`,
        keepUnusedDataFor: 30,
      }),

      fetchCryptoFromWatchlist: builder.query({
        query: (ids) => `/coins/markets?vs_currency=usd&ids=${ids}`,
        keepUnusedDataFor: 30,
      }),

      fetchHistoricalPrice: builder.query({
        query: ({ coinId, date }) => `/coins/${coinId}/history?date=${date}`, // API endpoint
      }),

      fetchCryptoDetails: builder.query({
        query: (id) =>
          `/coins/${id}?localization=false&tickers=false&market_data=true&community_data=true&developer_data=true&sparkline=false`,
      }),
    };
  },
});

export const {
  useFetchCryptoCollectionQuery,
  useFetchPopularCryptoQuery,
  useFetchCryptoFromWatchlistQuery,
  useFetchSearchedCryptoQuery,
  useLazyFetchHistoricalPriceQuery,
  useFetchCryptoDetailsQuery,
} = cryptoListingApi;

export { cryptoListingApi };
