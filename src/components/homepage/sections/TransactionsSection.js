import { FiArrowUp, FiArrowDown } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { formatDate } from '../../../helpers';
import { InformationCircleIcon } from '@heroicons/react/24/outline';
import Skeleton from '../../Skeleton';

export default function TransactionsSection({ transactions, isFetching, error }) {
  let content;

  if (isFetching) {
    content = (
      <div className="space-y-3 p-4">
        <Skeleton className="h-16 w-full rounded-lg dark:bg-gray-700" times={3} />
      </div>
    );
  } else if (!transactions) {
    content = (
      <div className="p-4 sm:p-6 m-4 rounded-2xl border border-blue-300 dark:border-blue-800  shadow-sm">
        <div className="flex items-start items-center gap-3">
          <InformationCircleIcon className="h-6 w-6 text-blue-600 dark:text-blue-400 mt-1 sm:mt-0" />
          <p className="text-sm text-blue-800 dark:text-blue-300">Nema pronađenih transakcija</p>
        </div>
      </div>
    );
  } else if (error) {
    content = (
      <div className="p-4 m-4 rounded-2xl border border-red-300 dark:border-red-700 bg-red-50 dark:bg-red-900/20 shadow-sm">
        <div className="flex items-center gap-3">
          <InformationCircleIcon className="h-6 w-6 text-red-600 dark:text-red-400" />
          <p className="text-sm text-red-800 dark:text-red-300">
            Došlo je do greške prilikom učitavanja transakcija. Pokušaj ponovo kasnije.
          </p>
        </div>
      </div>
    );
  } else {
    content = transactions.slice(0, 3).map((tx, index) => (
      <div
        key={index}
        className="flex items-center hover:bg-gray-50 dark:hover:bg-gray-700/50 p-2 rounded-lg transition-colors duration-200"
      >
        <div
          className={`w-10 h-10 rounded-lg flex items-center justify-center mr-3 ${
            tx.type === 'buy'
              ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400'
              : 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400'
          }`}
        >
          {tx.type === 'buy' ? <FiArrowUp /> : <FiArrowDown />}
        </div>
        <div className="flex-1">
          <h3 className="font-medium text-gray-800 dark:text-white">
            {tx.quantity} {tx.title}
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">{formatDate(tx)}</p>
        </div>
        <div
          className={`font-medium ${
            tx.type === 'buy'
              ? 'text-green-500 dark:text-green-400'
              : 'text-red-500 dark:text-red-400'
          }`}
        >
          {tx.totalValue.toFixed(2)}$
        </div>
      </div>
    ));
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-medium font-bold text-gray-800 dark:text-white">
          Najnovije transakcije
        </h2>
        <Link
          to="/transactions"
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
