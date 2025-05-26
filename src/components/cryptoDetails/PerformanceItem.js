// Helper components
import { FiArrowUp, FiArrowDown } from 'react-icons/fi';
function PerformanceItem({ label, value, change, date, changeClass }) {
  return (
    <div>
      <div className="flex justify-between items-center ">
        <span className="text-sm text-gray-500 dark:text-gray-400 mb-1">{label}</span>
        <span className={` flex items-center font-medium  rounded ${changeClass}`}>
          {change >= 0 ? (
            <FiArrowUp className="w-4 h-4 mr-1" />
          ) : (
            <FiArrowDown className="w-4 h-4 mr-1" />
          )}
          {change?.toFixed(2)}%
        </span>
      </div>
      <p className="font-semibold text-gray-800 dark:text-white">{value}</p>

      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{date}</p>
    </div>
  );
}
export default PerformanceItem;
