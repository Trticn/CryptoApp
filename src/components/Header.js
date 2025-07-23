import { Link } from 'react-router-dom';
import { FiRefreshCw, FiMenu, FiMoon, FiSun } from 'react-icons/fi';
import { useState } from 'react';
import { useSelector} from "react-redux";
import { useTheme } from '../context/ThemeContext'
import { primaryNavLinks } from '../config/Links';
import Sidebar from './Sidebar';
import Search from './Search';
import ProfileNavigation from './ProfileNavigation';

import crypto from '../images/crypto.png';

function Header() {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const [isProfileNavigationOpen, setIsProfileNavigationOpen] = useState(false)
  const user = useSelector(state => state.auth.user);
  const handleRefresh = () => {
    setIsRefreshing(true);
  };

  const toggleProfileNavigation =()=>{
    setIsProfileNavigationOpen(!isProfileNavigationOpen)
  }

  return (
    <div className='overflow-hidden'>
      <header className="w-screen flex overflow-hidden items-center justify-between px-6 md:px-10 py-4 h-20 bg-white dark:bg-gray-800 shadow-sm">
        <div className="flex items-center">
          {/* Mobile menu */}
          <button
            onClick={() => setIsMobileSidebarOpen(true)}
            className="lg:hidden mr-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition"
          >
            <FiMenu className="text-gray-600 dark:text-gray-300 text-xl" />
          </button>

          {/* Logo */}
          <Link to="/" className="flex items-center">
            <div className="w-8 h-8 rounded-lg overflow-hidden mr-3">
              <img src={crypto} alt="Logo" loading="lazy" className="w-8 h-8" />
            </div>
          </Link>

          {/* Desktop navigation */}
          <nav className="hidden lg:flex ml-10">
            <ul className="flex space-x-1">
              {primaryNavLinks.map((item, index) => (
                <li key={index}>
                  <Link
                    to={item.path}
                    className="flex items-center p-3 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                  >
                    <span className="mr-2">{item.icon}</span>
                    <span>{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="flex items-center gap-4 max-w-5xl justify-end w-full">
          <div className="hidden md:block flex-1">
            <Search />
          </div>

          <div className="md:hidden">
            <Search />
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition"
            >
              {theme === 'light' ? (
                <FiMoon className="text-gray-600 dark:text-gray-300" />
              ) : (
                <FiSun className="text-gray-600 dark:text-gray-300" />
              )}
            </button>

            <button
              onClick={handleRefresh}
              className={`p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition ${
                isRefreshing ? 'animate-spin' : ''
              }`}
            >
              <FiRefreshCw className="text-gray-600 dark:text-gray-300" />
            </button>
            
      
              <div
                onClick={toggleProfileNavigation}
                className="flex justify-center bg-gradient-to-r from-blue-500 to-indigo-600 items-center text-white text-lg font-bold w-8 h-8 rounded-full  cursor-pointer"
              > <span>{user?.username?.[0]}</span></div>      
    
           
          </div>
        </div>
      </header>
      {isProfileNavigationOpen&&
      <ProfileNavigation isOpen={isProfileNavigationOpen} onClose={() => setIsProfileNavigationOpen(false)} />
      }

              
      <Sidebar isOpen={isMobileSidebarOpen} onClose={() => setIsMobileSidebarOpen(false)} />
    </div>
  );
}

export default Header;
