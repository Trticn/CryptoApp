
import { FiTrendingUp, FiArrowUp,FiArrowDown } from 'react-icons/fi';

export default function GainerCard({ topGainer }) {
  return (
    <div
      className="w-full p-6 rounded-2xl shadow-lg border transition-all duration-300 
 
         bg-gradient-to-br from-white to-gray-50 border-gray-200 hover:border-green-500 hover:shadow-green-500/20
        dark:bg-gradient-to-br  dark:from-gray-800  dark:to-gray-700  dark:border-gray-700  dark:hover:border-green-500  dark:hover:shadow-green-500/20"
    >
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center mb-1">
            <FiTrendingUp className="text-green-500 dark:text-green-400 mr-2" />
            <p className="text-gray-500 dark:text-gray-400 text-sm">Najveći rast</p>
          </div>
          {topGainer ? (
            <>
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                {topGainer?.symbol?.toUpperCase() || 'N/A'}
              </h2>
              <div className="flex items-center mt-1">
                {topGainer.priceChangePercentage24h > 0 ? (
                  <>
                    <FiArrowUp className="text-green-500 dark:text-green-400 mr-1" />
                    <span className="text-green-500 dark:text-green-400 text-sm font-medium">
                      {topGainer.priceChangePercentage24h.toFixed(2)}% danas
                    </span>
                  </>
                ) : (
                  <>
                    <FiArrowDown className="text-red-500 dark:text-red-400 mr-1" />
                    <span className="text-red-500 dark:text-red-400 text-sm font-medium">
                      {topGainer.priceChangePercentage24h.toFixed(2)}% danas
                    </span>
                  </>
                )}
              </div>
            </>
          ) : (
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">N/A</h2>
          )}
        </div>
        <div
          className="p-3 rounded-lg shadow-inner 
       
            bg-gradient-to-br from-green-100 to-green-50 border border-green-200
          dark:bg-gradient-to-br  dark:from-green-900/50  dark:to-green-800/30  dark:border  dark:border-green-800/20"
        >
          {topGainer ? (
            <img
              src={topGainer.image}
              alt="Top performer"
              className="w-6 h-6"
            />
          ) : (
            <FiTrendingUp className="text-green-600 dark:text-green-400 text-xl" />
          )}
        </div>
      </div>
    </div>
  );
}
