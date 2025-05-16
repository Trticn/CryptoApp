import { Link } from 'react-router-dom';
import { 
  FiRefreshCw, FiMenu, FiMoon, FiSun 
} from 'react-icons/fi';
import crypto from '../images/crypto.png'
import { primaryNavLinks } from '../config/Links';
import { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import Sidebar from './Sidebar';

function Header() {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const { theme, toggleTheme } = useTheme();

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 1000);
    window.location.reload();
  };

  const toggleMobileSidebar = () => {
    setIsMobileSidebarOpen(!isMobileSidebarOpen);
  };

  return (
    <>
      <header className="w-screen flex justify-between items-center py-4 px-6 bg-white dark:bg-gray-800 shadow-sm sticky top-0 z-40">
        <div className="flex items-center">
          {/* Mobile menu button */}
          <button 
            onClick={toggleMobileSidebar}
            className="lg:hidden mr-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <FiMenu className="text-gray-600 dark:text-gray-300 text-xl" />
          </button>
          
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <div className="w-8 h8 rounded-lg flex items-center justify-center mr-3">
              <img alt='K' src={crypto}/>
            </div>
          </Link>
          
          {/* Desktop navigation */}
          <nav className="hidden lg:flex ml-10">
            <ul className="flex space-x-1">
              {primaryNavLinks.map((item, index) => (
                <li key={index}>
                  <Link
                    to={item.path}
                    className="flex items-center p-3 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  >
                    <span className="mr-2">{item.icon}</span>
                    <span>{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        
        {/* Right side controls */}
        <div className="flex items-center space-x-3">
          {/* Theme toggle */}
          <button 
            onClick={toggleTheme}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            {theme === 'light' ? (
              <FiMoon className="text-gray-600 dark:text-gray-300" />
            ) : (
              <FiSun className="text-gray-600 dark:text-gray-300" />
            )}
          </button>
          
     
          
          <button 
            onClick={handleRefresh}
            className={`p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${isRefreshing ? 'animate-spin' : ''}`}
          >
            <FiRefreshCw className="text-gray-600 dark:text-gray-300" />
          </button>
          

          
          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-400 to-blue-600 cursor-pointer"></div>
        </div>
      </header>

      {/* Mobile sidebar */}
      <Sidebar isOpen={isMobileSidebarOpen} onClose={toggleMobileSidebar} />
    </>
  );
}

export default Header;