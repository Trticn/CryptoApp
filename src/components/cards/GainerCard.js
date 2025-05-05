// components/cards/GainerCard.jsx
import { FiTrendingUp,FiArrowUp } from "react-icons/fi";
import { useTheme } from "../../context/ThemeContext";

export default function GainerCard({ topGainer }) {
  const { theme } = useTheme();

  return (
    <div className={`w-full md:max-w-sm p-6 rounded-2xl shadow-lg border transition-all duration-300 ${
      theme === 'light'
        ? 'bg-gradient-to-br from-white to-gray-50 border-gray-200 hover:border-green-500 hover:shadow-green-500/20'
        : 'bg-gradient-to-br from-gray-800 to-gray-700 border-gray-700 hover:border-green-500 hover:shadow-green-500/20'
    }`}>
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center mb-1">
            <FiTrendingUp className="text-green-500 dark:text-green-400 mr-2" />
            <p className="text-gray-500 dark:text-gray-400 text-sm">Najveći rast</p>
          </div>
          {topGainer ? (
            <>
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                {topGainer.symbol.toUpperCase()}
              </h2>
              <div className="flex items-center mt-1">
                <FiArrowUp className="text-green-500 dark:text-green-400 mr-1" />
                <span className="text-green-500 dark:text-green-400 text-sm font-medium">
                  {topGainer.priceChangePercentage24h.toFixed(2)}%
                  danas
                </span>
              </div>
            </>
          ) : (
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">N/A</h2>
          )}
        </div>
        <div className={`p-3 rounded-lg shadow-inner ${
          theme === 'light'
            ? 'bg-gradient-to-br from-green-100 to-green-50 border border-green-200'
            : 'bg-gradient-to-br from-green-900/50 to-green-800/30 border border-green-800/20'
        }`}>
          {topGainer ? (
            <img
              src={topGainer.image}
              alt="Top performer"
              className="w-6 h-6"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "/crypto-placeholder.png";
              }}
            />
          ) : (
            <FiTrendingUp className="text-green-600 dark:text-green-400 text-xl" />
          )}
        </div>
      </div>
    </div>
  );
}