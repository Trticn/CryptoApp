import { Outlet } from 'react-router-dom';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/homepage/sections/Footer';

function Root() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 ">
      <Header />
      {/* Glavni sadržaj raste i gura footer dole */}
      <main className="flex-1 overflow-y-auto  ">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default Root;
