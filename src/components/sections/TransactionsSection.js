
import { FiArrowUp, FiArrowDown } from "react-icons/fi";
import { Link } from 'react-router-dom';
import Skeleton from "../Skeleton";
import { formatDate } from "../../helpers";



export default function TransactionsSection({ transactions, isFetching }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-medium font-bold text-gray-800 dark:text-white">
          Najnovije transakcije
        </h2>
        <Link to='/transactions' className="text-sm text-blue-500 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors">
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
            {transactions.slice(-3).map((tx, index) => (
              <div key={index} className="flex items-center hover:bg-gray-50 dark:hover:bg-gray-700/50 p-2 rounded-lg transition-colors duration-200">
                <div
                  className={`w-10 h-10 rounded-lg flex items-center justify-center mr-3 ${
                    tx.type === "buy"
                      ? "bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400"
                      : "bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400"
                  }`}
                >
                  {tx.type === "buy" ? <FiArrowUp /> : <FiArrowDown />}
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-gray-800 dark:text-white">
                    {tx.quantity} {tx.title}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{formatDate(tx)}</p>
                </div>
                <div className={`font-medium ${tx.type === 'buy'
                ? 'text-green-500 dark:text-green-400'
                : 'text-red-500 dark:text-red-400'}`} >
                  
              
                  {tx.totalValue.toFixed(2)}$
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
}