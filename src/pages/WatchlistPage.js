import WatchlistListing from '../components/WatchlistListing';
import {ArrowLeftIcon} from '@heroicons/react/24/outline';
import useHandleBack from '../hooks/useHandleBack';


function WatchlistPage() {
  const handleBack = useHandleBack();

  return (
    <div className="p-6 md:p-10 min-h-screen">
      <header className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mt-5">
                  <div className='flex gap-6'>
            <div className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white flex items-center">
            <button
            onClick={handleBack}
            className="p-2 rounded-lg flex justify-center items-center  hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            aria-label="Nazad na listu"
          >
            <ArrowLeftIcon className="h-5 w-5 text-gray-600 dark:text-gray-300" />
          </button>
       
          
            </div>

            <div className='text-2xl md:text-3xl fpnt-semibold text-gray-900 dark:text-white gap-4'>
            <h1 className='font-bold'>Tvoji Favoriti</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Pregled svih tvojih favorizovanih kriptovaluta
            </p>
            </div>
          </div>
        </div>
      </header>
      <WatchlistListing showThead={true} />
    </div>
  );
}

export default WatchlistPage;
