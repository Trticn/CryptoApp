
import { useSelector } from 'react-redux';
import { useEffect} from 'react';
import { useDispatch} from 'react-redux';
import { setCredentials, setUserLogout, setInitialized, useGetCurrentUserQuery } from '../store';


function AuthInitializer({ children }) {
  const dispatch = useDispatch();
  const { data, error, isLoading, isUninitialized } = useGetCurrentUserQuery();
  const initialized = useSelector(state => state.auth.initialized);
  useEffect(() => {
    if (initialized || isLoading || isUninitialized) return;

    if (data?.data?.user) {
      dispatch(setCredentials({ user: data.data.user }));
      dispatch(setInitialized());
    } else if (error) {
      if (error.status === 401) {
        dispatch(setUserLogout());
      }
      dispatch(setInitialized());
    }
    // Ako nema ni data ni error (npr. prvi render), ne radi ništa
  }, [data, error, isLoading, isUninitialized, initialized, dispatch]);

  return children;
}
export default AuthInitializer;