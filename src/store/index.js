import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { cryptoListingApi } from './apis/cryptoListingApi';
import { transactionsApi } from './apis/transactionsApi';
import { portfolioApi } from './apis/portfolioApi';
import { transactionFormReducer } from './apis/slices/transactionFormSlice';
import {
  changeQuantity,
  changeDate,
  changeDescription,
  changeTitle,
  changeType,
  resetForm,
} from './apis/slices/transactionFormSlice';

export const store = configureStore({
  reducer: {
    [transactionsApi.reducerPath]: transactionsApi.reducer,
    [cryptoListingApi.reducerPath]: cryptoListingApi.reducer,
    [portfolioApi.reducerPath]: portfolioApi.reducer,
    transactionForm: transactionFormReducer,
  },

  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware()
      .concat(cryptoListingApi.middleware)
      .concat(transactionsApi.middleware)
      .concat(portfolioApi.middleware);
  },
});

setupListeners(store.dispatch);

export { changeQuantity, changeDate, changeDescription, changeTitle, changeType, resetForm };

export {
  useFetchCryptoCollectionQuery,
  useFetchPopularCryptoQuery,
  useFetchSearchedCryptoQuery,
  useLazyFetchHistoricalPriceQuery,
} from './apis/cryptoListingApi';

export {
  useFetchTransactionsQuery,
  useAddTransactionMutation,
  useRemoveTransactionMutation,
} from './apis/transactionsApi';

export {
  useGetPortfolioSnapshotsQuery,
  useAddPortfolioSnapshotMutation,
} from './apis/portfolioApi';
