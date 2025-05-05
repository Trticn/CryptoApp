
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const transactionsApi = createApi({
    reducerPath:'transactions',
    baseQuery:fetchBaseQuery({
        baseUrl:'https://cryptoappbackend.onrender.com'
    }),
    

    endpoints(builder){
        return{
          fetchTransactions:builder.query({
            query:()=> '/transactions',
            providesTags:["Transactions"]
        }),
            addTransaction:builder.mutation({
                query:(transaction)=>({
                    url:'/transactions',
                    method:'POST',
                    body: transaction
                }),
                invalidatesTags:["Transactions"]
            }),

            removeTransaction: builder.mutation({
                query: (transaction) => ({
                  url: `/transactions/${transaction.id}`,  
                  method: 'DELETE',
                }),
                invalidatesTags: ['Transactions'],
              }),
        }
    }
});



export const {
  useFetchTransactionsQuery,
  useAddTransactionMutation,
  useRemoveTransactionMutation,
} = transactionsApi;


export {transactionsApi}