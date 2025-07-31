import { FiArrowUp, FiArrowDown } from 'react-icons/fi';
import { InformationCircleIcon } from '@heroicons/react/24/outline';
import Skeleton from '../../Skeleton';
import { Link } from 'react-router-dom';

export default function InvestmentsSection({ assets, isFetching, error }) {
  let content;

  if (isFetching) {
    content = (
      <div className="space-y-3 p-4">
        <Skeleton className="h-16 w-full rounded-lg dark:bg-gray-700" times={3} />
      </div>
    );
  } else if (assets.length === 0) {
    content = (
      <div className="p-4 sm:p-6 m-4 rounded-2xl border border-blue-300 dark:border-blue-800  shadow-sm">
        <div className="flex items-start items-center gap-3">
          <InformationCircleIcon className="h-6 w-6 text-blue-600 dark:text-blue-400 mt-1 sm:mt-0" />
          <p className="text-sm text-blue-800 dark:text-blue-300">Nema pronađenih investicija</p>
        </div>
      </div>
    );
  } else if (error) {
    content = (
      <div className="p-4 m-4 rounded-2xl border border-red-300 dark:border-red-700 bg-red-50 dark:bg-red-900/20 shadow-sm">
        <div className="flex items-center gap-3">
          <InformationCircleIcon className="h-6 w-6 text-red-600 dark:text-red-400" />
          <p className="text-sm text-red-800 dark:text-red-300">
            Došlo je do greške prilikom učitavanja investicija. Pokušaj ponovo kasnije.
          </p>
        </div>
      </div>
    );
  } else {
    content = assets.map((coin, index) => (
      <Link key={coin.id || index} to={`/search/${coin.id}`}>
      <div
        className="flex items-center hover:bg-gray-50 dark:hover:bg-gray-700/50 p-2 rounded-lg transition-colors duration-200"
      >
        <div className="w-10 h-10 rounded-lg flex items-center justify-center mr-3 bg-gray-100 dark:bg-gray-700">
          <img src={coin.image} alt={coin.title} className="w-6 h-6" />
        </div>
        <div className="flex-1">

          
          <h3 className="font-medium text-gray-800 dark:text-white">{coin.title}</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {coin.currentValue.toFixed(2)}$
          </p>
        </div>
        <div
          className={`flex items-center font-medium ${
            coin.priceChangePercentage24h > 0
              ? 'text-green-500 dark:text-green-400'
              : 'text-red-500 dark:text-red-400'
          }`}
        >
          {coin.priceChangePercentage24h > 0 ? (
            <FiArrowUp className="mr-1" />
          ) : (
            <FiArrowDown className="mr-1" />
          )}
          <span>{coin.priceChangePercentage24h.toFixed(2)}%</span>
        </div>
      </div>
      </Link>
    ));
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-medium font-bold text-gray-800 dark:text-white">Najveće investicije</h2>
        <Link
          to="/portfolio"
          className="text-sm text-blue-500 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
        >
          Prikaži sve
        </Link>
      </div>

      <div className="space-y-4">
        {isFetching ? (
          <div className="space-y-3 p-4">
            <Skeleton className="h-16 w-full rounded-lg dark:bg-gray-700" times={3} />
          </div>
        ) : (
          <>{content}</>
        )}
      </div>
    </div>
  );
}
