import { Link } from 'react-router-dom';
import { FiX } from 'react-icons/fi';
import { Links } from '../config/Links';

import crypto from '../images/crypto.png';
function Sidebar({ isOpen, onClose }) {
  return (
    <div
      className={`fixed inset-0 z-50 transition-all duration-300 ${
        isOpen ? 'visible' : 'invisible'
      }`}
    >
      <div
        className={`absolute inset-0 bg-black transition-opacity ${
          isOpen ? 'opacity-40' : 'opacity-0'
        }`}
        onClick={onClose}
      />

      <aside
        className={`absolute left-0 top-0 h-full w-72 md:w-96 bg-white dark:bg-gray-800 shadow-2xl rounded-r-2xl transform transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between px-6 py-4 h-20 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
          <div className="w-8 h-8 rounded-lg overflow-hidden mr-3">
              <img src={crypto} alt="Logo" loading="lazy" className="w-8 h-8" />
            </div>
            <span className="font-medium text-lg tracking-widest text-gray-800 dark:text-gray-200">
              Kriptomat
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition"
            aria-label="Close sidebar"
          >
            <FiX className="text-gray-600 dark:text-gray-300 text-xl" />
          </button>
        </div>

        <nav className="p-5">
          <ul className="space-y-3">
            {Links.map((item, index) => (
              <Link
                key={index}
                to={item.path}
                className="flex items-center px-4 py-3 rounded-xl text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition font-medium"
                onClick={onClose}
              >
                <span className="mr-3 text-lg text-indigo-500 dark:text-indigo-400">
                  {item.icon}
                </span>
                <span>{item.label}</span>
              </Link>
            ))}
          </ul>
        </nav>

   
      </aside>
    </div>
  );
}

export default Sidebar;
