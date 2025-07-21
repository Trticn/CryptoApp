import { useEffect,useRef } from 'react';
import { useDispatch} from 'react-redux';
import { setCredentials, setUserLogout, setInitialized, useGetCurrentUserQuery } from '../store';

function AuthInitializer({ children }) {
  const dispatch = useDispatch();
  const { data, error, isLoading, isUninitialized } = useGetCurrentUserQuery();
  const initializedRef = useRef(false); // Čuva informaciju da li smo već inicijalizovali auth

  useEffect(() => {
    if (initializedRef.current || isLoading || isUninitialized) return;

    if (data?.user) {
      dispatch(setCredentials({ user: data.user }));
    } else if (error?.status === 401) {
      dispatch(setUserLogout());
    }

    dispatch(setInitialized());
    initializedRef.current = true;
  }, [data, error, isLoading, isUninitialized, dispatch]);

  return children;
}
  

export default AuthInitializer;