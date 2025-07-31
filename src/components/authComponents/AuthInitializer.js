import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import {
  setCredentials,
  setUserLogout,
  setInitialized,
  useGetCurrentUserQuery,
} from '../../store';
import { useSavePortfolioSnapshot } from '../../hooks/useSavePortfolioSnapshot';

function AuthInitializer({ children }) {
  const dispatch = useDispatch();
  const {
    data,
    error,
    isLoading,
    isUninitialized,
    isSuccess,
    isError,
  } = useGetCurrentUserQuery();
  const initialized = useSelector((state) => state.auth.initialized);
  const { canSave, saveSnapshot } = useSavePortfolioSnapshot();

  // 1. Authentication
  useEffect(() => {
    if (initialized || isLoading || isUninitialized) return;

    if (isSuccess) {
      dispatch(setCredentials({ user: data?.data?.user || null }));
    }
    
    // Always set initialized, regardless of success or error
    dispatch(setInitialized());
    
    // Handle specific error case
    if (isError && error?.status === 401) {
      dispatch(setUserLogout());
    }
  }, [initialized, isLoading, isUninitialized, isSuccess, data, isError, error, dispatch]);

  // 2. Snapshot
  useEffect(() => {
    if (canSave) {
      saveSnapshot();
    }
  }, [canSave, saveSnapshot]);

  return children;
}

export default AuthInitializer;


