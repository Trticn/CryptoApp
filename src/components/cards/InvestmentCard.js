// components/cards/InvestmentCard.jsx
import { FiAward, FiBarChart2 } from "react-icons/fi";
export default function InvestmentCard({ asset }) {


  return (
    <div className='w-full md:max-w-sm p-6 rounded-2xl shadow-lg border transition-all duration-300 

        bg-gradient-to-br from-white to-gray-50 border-gray-200 hover:border-yellow-500 hover:shadow-yellow-500/20
       dark:bg-gradient-to-br  dark:from-gray-800  dark:to-gray-700  dark:border-gray-700  dark:hover:border-yellow-500  dark:hover:shadow-yellow-500/20'
   >
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center mb-1">
            <FiAward className="text-yellow-500 dark:text-yellow-400 mr-2" />
            <p className="text-gray-500 dark:text-gray-400 text-sm">Najveća investicija</p>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
            {asset?.symbol?.toUpperCase() || "N/A"}
          </h2>
          {asset && (
            <div className="text-sm text-green-600 dark:text-green-400 mt-1 font-medium">
              {asset.totalQuantity?.toFixed(2)}{" "}
              {asset.symbol?.toUpperCase()} (~$
              {asset.currentValue?.toFixed(2)})
            </div>
          )}
        </div>
        <div className='p-3 rounded-lg shadow-inner
 
            bg-gradient-to-br from-yellow-100 to-yellow-50 border border-yellow-200 
             dark:bg-gradient-to-br  dark:from-yellow-900/50  dark:to-yellow-800/30  dark:border  dark:border-yellow-800/20'
        >
          {asset?.image ? (
            <img
              src={asset.image}
              alt={asset.title}
              className="w-6 h-6"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "/crypto-placeholder.png";
              }}
            />
          ) : (
            <FiBarChart2 className="text-yellow-600 dark:text-yellow-400 text-xl" />
          )}
        </div>
      </div>
    </div>
  );
}