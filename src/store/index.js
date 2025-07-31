import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { cryptoListingApi } from './apis/cryptoListingApi';
import { transactionsApi } from './apis/transactionsApi';
import { portfolioApi } from './apis/portfolioApi';
import { watchlistApi } from './apis/watchlistApi';
import { authApi } from './apis/authApi';
import { secureApi } from './apis/secureApi';
import { userBlogApi } from './apis/userBlogApi';
import { transactionFormReducer } from './apis/slices/transactionFormSlice';
import { searchSliceReducer } from './apis/slices/searchSlice';
import { authReducer } from './apis/slices/authSlice';
import { setCredentials,setUserLogout,setInitialized } from './apis/slices/authSlice';
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
    [authApi.reducerPath]:authApi.reducer,
    [secureApi.reducerPath]:secureApi.reducer,
    [userBlogApi.reducerPath]:userBlogApi.reducer,
    transactionForm: transactionFormReducer,
    search: searchSliceReducer,
    auth:authReducer
  },

  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware()
      .concat(cryptoListingApi.middleware)
      .concat(transactionsApi.middleware)
      .concat(portfolioApi.middleware)
      .concat(watchlistApi.middleware)
      .concat(authApi.middleware)
      .concat(secureApi.middleware)
      .concat(userBlogApi.middleware)

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
  setCredentials,
  setUserLogout,
  setInitialized
  
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



export {
  useRegisterMutation,
  useLoginMutation,
  useGoogleLoginMutation,
  useRefreshTokenMutation,
  useLogoutMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useGetCurrentUserQuery,

} from './apis/authApi';


export {
  useChangePasswordMutation,
  useChangeEmailMutation,
} from './apis/secureApi'

export {
  useFetchUserBlogsQuery,
  useAddUserBlogMutation,
  useUpdateUserBlogMutation,
  useRemoveUserBlogMutation,
} from './apis/userBlogApi'

