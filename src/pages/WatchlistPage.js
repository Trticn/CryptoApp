import WatchlistListing from '../components/WatchlistListing';
import { ListBulletIcon } from '@heroicons/react/24/outline';

function WatchlistPage() {
  return (
    <div className="p-6 md:p-10">
      <header className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mt-5">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <ListBulletIcon className="w-6 h-6" />
              Tvoji favoriti
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Pregled svih tvojih favorizovanih kriptovaluta
            </p>
          </div>
        </div>
      </header>
      <WatchlistListing showThead={true} />
    </div>
  );
}

export default WatchlistPage;
