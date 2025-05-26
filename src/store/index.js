import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { cryptoListingApi } from './apis/cryptoListingApi';
import { transactionsApi } from './apis/transactionsApi';
import { portfolioApi } from './apis/portfolioApi';
import { watchlistApi } from './apis/watchlistApi';
import { transactionFormReducer } from './apis/slices/transactionFormSlice';
import { searchSliceReducer } from './apis/slices/searchSlice';
import {
  changeQuery,
  changeDebouncedQuery,
  changeShowResults,
  clearSearch,
} from './apis/slices/searchSlice';
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
    [watchlistApi.reducerPath]: watchlistApi.reducer,
    transactionForm: transactionFormReducer,
    search: searchSliceReducer,
  },

  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware()
      .concat(cryptoListingApi.middleware)
      .concat(transactionsApi.middleware)
      .concat(portfolioApi.middleware)
      .concat(watchlistApi.middleware);
  },
});

setupListeners(store.dispatch);

export {
  changeQuantity,
  changeDate,
  changeDescription,
  changeTitle,
  changeType,
  resetForm,
  changeQuery,
  changeDebouncedQuery,
  changeShowResults,
  clearSearch,
};

export {
  useFetchCryptoCollectionQuery,
  useFetchPopularCryptoQuery,
  useFetchCryptoFromWatchlistQuery,
  useFetchSearchedCryptoQuery,
  useLazyFetchHistoricalPriceQuery,
  useFetchCryptoDetailsQuery,
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

export {
  useFetchWatchlistQuery,
  useAddCryptoToWatchlistMutation,
  useRemoveCryptoFromWatchlistMutation,
} from './apis/watchlistApi';
