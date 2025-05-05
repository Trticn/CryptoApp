import { FiArrowUp, FiArrowDown } from "react-icons/fi";
import Skeleton from "../Skeleton";
import { Link } from 'react-router-dom';

export default function InvestmentsSection({ assets, isFetching }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-medium font-bold text-gray-800 dark:text-white">
          Najveće investicije
        </h2>
        <Link to='/portfolio' className="text-sm text-blue-500 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors">
          Prikaži sve
        </Link>
      </div>

      <div className="space-y-4">
        {isFetching ? (
          <div className="space-y-3 p-4">
            <Skeleton className="h-16 w-full rounded-lg dark:bg-gray-700" times={3} />
          </div>
        ) : (
          <>
            {assets.map((coin, index) => (
              <div key={index} className="flex items-center hover:bg-gray-50 dark:hover:bg-gray-700/50 p-2 rounded-lg transition-colors duration-200">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center mr-3 bg-gray-100 dark:bg-gray-700">
                  <img
                    src={coin.image}
                    alt={coin.title}
                    className="w-6 h-6"
                  />
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
                      ? "text-green-500 dark:text-green-400"
                      : "text-red-500 dark:text-red-400"
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
            ))}
          </>
        )}
      </div>
    </div>
  );
}