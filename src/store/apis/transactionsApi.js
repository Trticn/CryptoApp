import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const transactionsApi = createApi({
  reducerPath: 'transactions',
  baseQuery: fetchBaseQuery({
    baseUrl:process.env.CLIENT_URL+ '/api',
    credentials:'include'
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
      updateTransaction: builder.mutation({
        query: ({ id, ...transaction }) => ({
          url: `/transactions/${id}`,
          method: 'PUT',
          body: transaction,
        }),
        invalidatesTags: ['Transactions'],
      }),
      removeTransaction: builder.mutation({
        query: (transaction) => ({
          url: `/transactions/${transaction._id}`,
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
  useUpdateTransactionMutation,
  useRemoveTransactionMutation,
} = transactionsApi;

export { transactionsApi };
