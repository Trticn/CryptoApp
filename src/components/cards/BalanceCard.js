// components/cards/BalanceCard.jsx
import { FiPieChart, FiDollarSign,FiArrowUp,FiArrowDown } from "react-icons/fi";
import { useTheme } from "../../context/ThemeContext";

export default function BalanceCard({ totalValue, change24hPercent }) {
  const { theme } = useTheme();

  return (
    <div className={`w-full md:max-w-sm p-6 rounded-2xl shadow-lg border transition-all duration-300 ${
      theme === 'light' 
        ? 'bg-gradient-to-br from-white to-gray-50 border-gray-200 hover:border-blue-500 hover:shadow-blue-500/20'
        : 'bg-gradient-to-br from-gray-800 to-gray-700 border-gray-700 hover:border-blue-500 hover:shadow-blue-500/20'
    }`}>
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center mb-1">
            <FiPieChart className="text-blue-500 dark:text-blue-400 mr-2" />
            <p className="text-gray-500 dark:text-gray-400 text-sm">Ukupno stanje</p>
          </div>
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white">
            ${totalValue.toFixed(2)}
          </h2>
          <div className="flex items-center mt-2">
            {change24hPercent > 0 ? (
              <FiArrowUp className="text-green-500 dark:text-green-400 mr-1" />
            ) : (
              <FiArrowDown className="text-red-500 dark:text-red-400 mr-1" />
            )}
            <span className={`text-sm font-medium ${
              change24hPercent > 0
                ? "text-green-500 dark:text-green-400"
                : "text-red-500 dark:text-red-400"
            }`}>
              {change24hPercent.toFixed(2)}% danas
            </span>
          </div>
        </div>
        <div className={`p-3 rounded-lg shadow-inner ${
          theme === 'light'
            ? 'bg-gradient-to-br from-blue-100 to-blue-50 border border-blue-200'
            : 'bg-gradient-to-br from-blue-900/50 to-blue-800/30 border border-blue-800/20'
        }`}>
          <FiDollarSign className="text-blue-600 dark:text-blue-400 text-xl" />
        </div>
      </div>
    </div>
  );
}