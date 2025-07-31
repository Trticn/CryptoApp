import { useState } from 'react';
import TransactionList from '../components/transactionPageComponents/TransactionList';
import { ArrowUpIcon, ArrowDownIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';
import useHandleBack from '../hooks/useHandleBack';
function TransactionsPage() {
  const [transactionType, setTransactionType] = useState('all');
  const handleBack = useHandleBack();
  return (
    <div className="p-6 md:p-10 min-h-screen">
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mt-5">
          <div className='flex gap-6'>
            <div className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white flex items-center">
            <button
            onClick={handleBack}
            className="p-2 rounded-lg flex justify-center items-center  hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            aria-label="Nazad na listu"
          >
            <ArrowLeftIcon className="h-5 w-5 text-gray-600 dark:text-gray-300" />
          </button>
       
          
            </div>

            <div className='text-2xl md:text-3xl fpnt-semibold text-gray-900 dark:text-white gap-4'>
            <h1 className='font-bold'>Sve transakcije</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Pregled svih tvojih kupljenih i prodatih kriptovaluta
            </p>
            </div>
          </div>

          <div className="flex items-center justify-between  bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-700 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-md px-3 py-2 transition-all duration-300">
            <button
              onClick={() => setTransactionType('all')}
              className={`px-4 py-1.5 rounded-xl text-sm font-medium transition-all duration-200 ease-in-out transform hover:scale-105 ${
                transactionType === 'all'
                  ? 'bg-gray-200 dark:bg-gray-900 text-gray-700 dark:text-white shadow-sm'
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              Sve
            </button>

            <button
              onClick={() => setTransactionType('buy')}
              className={`px-4 py-1.5 rounded-xl text-sm font-medium flex items-center gap-1 transition-all duration-200 ease-in-out transform hover:scale-105 ${
                transactionType === 'buy'
                  ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 shadow-sm'
                  : 'text-gray-600 dark:text-gray-400 hover:bg-green-50 dark:hover:bg-gray-800 hover:text-green-700 dark:hover:text-green-300'
              }`}
            >
              <ArrowUpIcon className="h-4 w-4" />
              Kupljeno
            </button>

            <button
              onClick={() => setTransactionType('sell')}
              className={`px-4 py-1.5 rounded-xl text-sm font-medium flex items-center gap-1 transition-all duration-200 ease-in-out transform hover:scale-105 ${
                transactionType === 'sell'
                  ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 shadow-sm'
                  : 'text-gray-600 dark:text-gray-400 hover:bg-red-50 dark:hover:bg-gray-800 hover:text-red-700 dark:hover:text-red-300'
              }`}
            >
              <ArrowDownIcon className="h-4 w-4" />
              Prodato
            </button>
          </div>
        </div>
      </div>
      <TransactionList transactionType={transactionType} />
    </div>
  );
}

export default TransactionsPage;
