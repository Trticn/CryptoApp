import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { DB_LINK } from '../../config';
const transactionsApi = createApi({
  reducerPath: 'transactions',
  baseQuery: fetchBaseQuery({
    baseUrl: DB_LINK,
  }),

  endpoints(builder) {
    return {
      fetchTransactions: builder.query({
        query: () => '/transactions',
        keepUnusedDataFor: 180,
        providesTags: ['Transactions'],
        transformResponse: (response) =>
          [...response].sort((a, b) => new Date(b.date) - new Date(a.date)),
      }),
      addTransaction: builder.mutation({
        query: (transaction) => ({
          url: '/transactions',
          method: 'POST',
          body: transaction,
        }),
        invalidatesTags: ['Transactions'],
      }),

      removeTransaction: builder.mutation({
        query: (transaction) => ({
          url: `/transactions/${transaction.id}`,
          method: 'DELETE',
        }),
        invalidatesTags: ['Transactions'],
      }),
    };
  },
});

export const {
  useFetchTransactionsQuery,
  useAddTransactionMutation,
  useRemoveTransactionMutation,
} = transactionsApi;

export { transactionsApi };
