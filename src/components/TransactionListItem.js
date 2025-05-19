import { useRemoveTransactionMutation } from '../store';
import { ArrowUpIcon, ArrowDownIcon, TrashIcon } from '@heroicons/react/24/outline';
import { formatDate, formatNumber } from '../helpers';
function TransactionListItem({ transaction }) {
  const [removeTransaction, results] = useRemoveTransactionMutation();

  const handleRemoveTransaction = async () => {
    try {
      await removeTransaction(transaction).unwrap();
    } catch (error) {
      console.error('Failed to delete transaction:', error);
    }
  };

  return (
    <div
      key={transaction.id}
      className="transition-all min-h-[120px] hover:bg-gray-100 dark:hover:bg-gray-900 p-4 rounded-lg"
    >
      <div className="flex justify-between items-start">
        <div className="flex items-start">
          <div
            className={`p-3 rounded-lg mr-4 ${
              transaction.type === 'buy'
                ? 'bg-green-100 text-green-700 dark:bg-green-800/20 dark:text-green-400'
                : 'bg-red-100 text-red-700 dark:bg-red-800/20 dark:text-red-400'
            }`}
          >
            {transaction.type === 'buy' ? (
              <ArrowUpIcon className="h-5 w-5" />
            ) : (
              <ArrowDownIcon className="h-5 w-5" />
            )}
          </div>
          <div>
            <h3 className="text-base font-semibold text-gray-900 dark:text-white">
              {transaction.title}
            </h3>
            <div className="mt-1 grid grid-cols-2 gap-x-4 gap-y-1 sm:flex sm:flex-wrap">
              <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                <span className="font-medium mr-1">Količina:</span>
                <span className="capitalize">{transaction.quantity}</span>
              </div>
              <br />
              <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                <span className="font-medium mr-1">Cena:</span>
                <span className="capitalize">{formatNumber(transaction.priceAtTransaction)}$</span>
              </div>
              <br />
              <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                <span className="font-medium mr-1">Datum:</span>
                {formatDate(transaction)}
              </div>
            </div>
            {transaction.description && (
              <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
                {transaction.description}
              </p>
            )}
          </div>
        </div>
        <div className="flex flex-col items-end">
          <div className="flex items-center">
            <p
              className={`text-lg font-semibold ${
                transaction.type === 'buy'
                  ? 'text-green-500 dark:text-green-400'
                  : 'text-red-500 dark:text-red-400'
              }`}
            >
              {transaction.type === 'buy' ? '+' : '-'}${formatNumber(transaction.totalValue)}
            </p>
            <button
              onClick={handleRemoveTransaction}
              type="button"
              disabled={results.isLoading}
              className="ml-3 p-1 text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition-colors"
              title="Delete transaction"
            >
              <TrashIcon className="h-5 w-5 cursor-pointer" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TransactionListItem;
