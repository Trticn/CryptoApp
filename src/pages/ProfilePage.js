import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { FiUser, FiCalendar, FiEye, FiPlus } from 'react-icons/fi';
import { useState } from 'react';
import ErrorScreen from '../components/ErrorScreen';
import BlogList from '../components/BlogList';
import AddBlogPost from '../components/AddBlogPost';
import TopGainersSection from '../components/TopGainersSection';
import useHandleBack from '../hooks/useHandleBack';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('sr-RS', { year: 'numeric', month: 'long', day: 'numeric' });
}

export default function ProfilePage() {
  const user = useSelector(state => state.auth.user);
  const initialized = useSelector(state => state.auth.initialized);
  const [showAddBlogModal, setShowAddBlogModal] = useState(false);
  const handleBack = useHandleBack();

  const showModal = () =>{
    document.body.style.overflow = 'hidden';
    setShowAddBlogModal(true)
  }

  const closeModal = () =>{
    document.body.style.overflow = 'visible';
    setShowAddBlogModal(false)

  }
  if (!initialized) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Učitavanje profila...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
        <ErrorScreen/>
    );
  }

  return (
    <div className="p-6 w-screen md:p-10 min-h-screen bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-4">

        <div className="text-2xl gap-6 md:text-3xl font-bold text-gray-900 dark:text-white flex items-center">
            <button
            onClick={handleBack}
            className="p-2 rounded-lg flex justify-center items-center  hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            aria-label="Nazad na listu"
          >
            <ArrowLeftIcon className="h-5 w-5 text-gray-600 dark:text-gray-300" />
          </button>
       
          <div className="w-14 h-14 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center text-white text-2xl font-bold shadow-lg">
            {user.username?.[0] || <FiUser />}
          </div>
          </div>
          
          <div className="flex flex-col gap-1">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
              {user.username}
            </h2>
            <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
              <FiCalendar className="h-4 w-4" />
              <span>Pridružio se: {formatDate(user.createdAt)}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
              <span>{user.email}</span>
            </div>
          </div>
        </div>
        <Link
          to="/watchlist"
          className="flex items-center gap-2 bg-gray-100 dark:bg-gray-700 px-4 py-2 rounded-full text-blue-700 dark:text-blue-300 font-medium shadow hover:bg-blue-100 dark:hover:bg-blue-800 transition text-sm"
        >
          <FiEye /> Pogledaj Watchlist
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 lg:grid-rows-2">
        {/* Glavni div: zauzima 2 reda i 2 kolone na lg+ */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm lg:col-span-2 lg:row-span-2">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Tvoji postovi</h3>
            <button
              className="flex items-center justify-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-full font-medium text-base shadow-lg  transition-all hover:opacity-90"
              onClick={showModal}
            >
              <FiPlus className='text-lg' /> Novi post
            </button>
          </div>
          <div className="flex flex-col gap-4">
            <BlogList/>
          </div>
        </div>
        {/* Desna kolona: dva widgeta, svaki zauzima po jedan red u trećoj koloni na lg+ */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm flex flex-col min-h-[200px] lg:col-start-3 lg:row-start-1">
        <h2 className="text-medium font-bold text-gray-800 dark:text-white mb-2">Najpopularnije kriptovalute
            </h2>
          <>
          <TopGainersSection type='TrendingCrypto' />
          </>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm flex flex-col min-h-[200px] lg:col-start-3 lg:row-start-2">
        <h2 className="text-medium font-bold text-gray-800 dark:text-white mb-2">Najveći dobitnici
        </h2>
          <TopGainersSection type='TopGainers'/>
        </div>
      </div>
      <AddBlogPost open={showAddBlogModal} onClose={closeModal} />
    </div>
  );
} 