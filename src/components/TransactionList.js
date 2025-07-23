import { useFetchTransactionsQuery } from '../store';
import { InformationCircleIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';
import { ChartBarIcon } from '@heroicons/react/24/outline';
import Skeleton from './Skeleton';
import TransactionListItem from './TransactionListItem.js';
import Pagination from './Pagination.js';
import usePagination from '../hooks/usePagination.js';

function TransactionList({ transactionType }) {
  const { data, error, isFetching } = useFetchTransactionsQuery();
  console.log(data)
  let filteredTransactions = data ?? [];

  if (transactionType !== 'all') {
    filteredTransactions = filteredTransactions.filter((t) => t.type === transactionType);
  }

  const { currentPage, setCurrentPage, paginationData, totalPages } =
    usePagination(filteredTransactions);

  let content;

  if (isFetching) {
    content = (
      <div className="space-y-3 p-4">
        <Skeleton className="h-16 w-full rounded-2xl bg-gray-100 dark:bg-gray-800" times={10} />
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
  } else if (filteredTransactions.length === 0 && data.length > 0) {
    content = (
      <div className="p-4 sm:p-6 m-4 rounded-2xl border border-blue-300 dark:border-blue-800  shadow-sm">
        <div className="flex items-start items-center gap-3">
          <InformationCircleIcon className="h-6 w-6 text-blue-600 dark:text-blue-400 mt-1 sm:mt-0" />
          <p className="text-sm text-blue-800 dark:text-blue-300">
            {transactionType === 'all'
              ? 'Nema pronađenih transakcija.'
              : `Nema pronađenih ${
                  transactionType === 'sell' ? 'izlaznih' : 'ulaznih'
                } transakcija.`}
          </p>
        </div>
      </div>
    );
  } else if (data.length === 0) {
    content = (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="bg-blue-100 dark:bg-blue-900/30 p-4 rounded-full mb-4">
          <ChartBarIcon className="w-8 h-8 text-blue-500 dark:text-blue-400" />
        </div>
        <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
          Lista transakcija je prazna
        </h3>
        <p className="text-gray-500 dark:text-gray-400 max-w-md mb-4">
          Trenutno nemaš nijednu kripto transakciju. Kada dodaš svoju prvu transakciju, ovde ćeš
          videti pregled transakcija
        </p>
        <Link
          to="/add-transaction"
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
        >
          Dodaj prvu transakciju
        </Link>
      </div>
    );
  } else {
    content = (
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm overflow-hidden">
        {paginationData.map((transaction) => (
          <TransactionListItem key={transaction._id} transaction={transaction} />
        ))}
      </div>
    );
  }

  return (
    <div className='flex flex-col  justify-center overflow-hidden'>
      <div className='flex-1'>
      {content}
      </div>
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page) => setCurrentPage(page)}
        />
      )}
    </div>
  );
}

export default TransactionList;
