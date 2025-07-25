import { useFetchPopularCryptoQuery} from "../store"
import { FiArrowUp, FiArrowDown } from 'react-icons/fi';
import { InformationCircleIcon } from '@heroicons/react/24/outline';
import Skeleton from "./Skeleton";

function TopGainersSection({type}) {
  const { data, isFetching, error } = useFetchPopularCryptoQuery(); 
 
  let filteredData;

  if (type === 'TopGainers') {
    filteredData = data
      ?.filter(coin => coin.price_change_percentage_24h !== null)
      .sort((a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h)
      .slice(0, 5);
  } else {
    filteredData = data?.slice(0, 5);;
  }

  let content;

  if (isFetching) {
    content = (
      <div className="space-y-3 p-4">
        <Skeleton className="h-16 w-full rounded-lg dark:bg-gray-700" times={3} />
      </div>
    );
  } else if (filteredData?.length === 0) {
    content = (
      <div className="p-4 sm:p-6 m-4 rounded-2xl border border-blue-300 dark:border-blue-800  shadow-sm">
        <div className="flex items-start items-center gap-3">
          <InformationCircleIcon className="h-6 w-6 text-blue-600 dark:text-blue-400 mt-1 sm:mt-0" />
          <p className="text-sm text-blue-800 dark:text-blue-300">Nema pronađenih infromacija o kriptovalutama.</p>
        </div>
      </div>
    );
  } else if (error) {
    content = (
      <div className="p-4 m-4 rounded-2xl border border-red-300 dark:border-red-700 bg-red-50 dark:bg-red-900/20 shadow-sm">
        <div className="flex items-center gap-3">
          <InformationCircleIcon className="h-6 w-6 text-red-600 dark:text-red-400" />
          <p className="text-sm text-red-800 dark:text-red-300">
            Došlo je do greške prilikom učitavanja kriptovaluta. Pokušajte ponovo kasnije.
          </p>
        </div>
      </div>
    );
  } else {
    content = filteredData.map((coin, index) => (
      <div
        key={coin.id || index}
        className="flex items-center hover:bg-gray-50 dark:hover:bg-gray-700/50 p-2 rounded-lg transition-colors duration-200"
      >
        <div className="w-10 h-10 rounded-lg flex items-center justify-center mr-3 bg-gray-100 dark:bg-gray-700">
          <img src={coin.image} alt={coin.name} className="w-6 h-6" />
        </div>
        <div className="flex-1">
          <h3 className="font-medium text-gray-800 dark:text-white">{coin.name}</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {coin.current_price?.toLocaleString(undefined, { maximumFractionDigits: 2 })}$
          </p>
        </div>
        <div
          className={`flex items-center font-medium ${
            coin.price_change_percentage_24h > 0
              ? 'text-green-500 dark:text-green-400'
              : 'text-red-500 dark:text-red-400'
          }`}
        >
          {coin.price_change_percentage_24h > 0 ? (
            <FiArrowUp className="mr-1" />
          ) : (
            <FiArrowDown className="mr-1" />
          )}
          <span>{coin.price_change_percentage_24h?.toFixed(2)}%</span>
        </div>
      </div>
    ));
  }

  return <>{content}</>;
}

export default TopGainersSection