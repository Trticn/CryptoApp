import { Outlet } from 'react-router-dom';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../components/header/Header';
import Footer from  '../components/Footer'
import { useDispatch,useSelector } from 'react-redux';
import { hideNottification } from '../store';
import Notification from '../components/Nottification';


function Root() {
  const location = useLocation();
  const dispatch = useDispatch()
  const nottification = useSelector((state) => state.nottification);
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, [location.pathname]);


  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 ">
      <Header />

      {nottification.show && (
          <Notification
            onClose={() => dispatch(hideNottification())}
          />
        )}
      {/* Glavni sadržaj raste i gura footer dole */}
      <main className="flex-1 overflow-y-auto overflow-x-hidden">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default Root;
