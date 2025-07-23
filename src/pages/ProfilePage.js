import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { FiUser, FiCalendar, FiEye, FiPlus } from 'react-icons/fi';
import { useState } from 'react';
import ErrorScreen from '../components/ErrorScreen';
import BlogList from '../components/BlogList';
import AddBlogPost from '../components/AddBlogPost';

function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('sr-RS', { year: 'numeric', month: 'long', day: 'numeric' });
}

export default function ProfilePage() {
  const user = useSelector(state => state.auth.user);
  const initialized = useSelector(state => state.auth.initialized);
  const [showAddBlogModal, setShowAddBlogModal] = useState(false);



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
    <div className="p-6 md:p-10 min-h-screen bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center text-white text-2xl font-bold shadow-lg">
            {user.username?.[0] || <FiUser />}
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sekcija za postove korisnika (dummy prikaz) */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Tvoji postovi</h3>
            <button
              className="flex items-center justify-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-full font-medium text-base shadow-lg  transition-all hover:opacity-90"
              onClick={showModal}
            >
              <FiPlus className='text-lg' /> Novi post
            </button>
          </div>
          {/* Dummy postovi */}
          <div className="flex flex-col gap-4">
              <BlogList/>
          </div>
        </div>
        {/* Rezervisana kolona za buduće widgete ili statistiku */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm flex flex-col items-center justify-center min-h-[200px]">
          <span className="text-gray-400 dark:text-gray-500">Ovde može ići tvoja statistika, omiljene coine, ili nešto drugo.</span>
        </div>
      </div>
      <AddBlogPost open={showAddBlogModal} onClose={closeModal} />
    </div>
  );
} 