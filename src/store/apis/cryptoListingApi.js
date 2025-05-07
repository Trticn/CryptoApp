import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const cryptoListingApi = createApi({
    reducerPath:'crypto',
    baseQuery:fetchBaseQuery({
        baseUrl:"https://api.coingecko.com/api/v3",
       
    }),
    

    endpoints(builder){
        return{
            fetchPopularCrypto:builder.query({
                query:()=> "/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1",
                keepUnusedDataFor:60,
                providesTags:["PopularTransactions"]
            }),

            fetchSearchedCrypto:builder.query({
                query:(id) => `https://api.coingecko.com/api/v3/coins/${id}`,
                providesTags:["SingleCrypto"]
            }),

            fetchCryptoCollection:builder.query({
                query: (ids) => `/coins/markets?vs_currency=usd&ids=${ids}`,
                keepUnusedDataFor: 30,
                
            }),

            fetchHistoricalPrice: builder.query({
                query: ({ coinId, date }) => 
                  `/coins/${coinId}/history?date=${date}`, // API endpoint
              }),
         



        }
    }
});



export const {
    useFetchCryptoCollectionQuery,
    useFetchPopularCryptoQuery,
    useFetchSearchedCryptoQuery,
    useLazyFetchHistoricalPriceQuery
} = cryptoListingApi


export {cryptoListingApi}