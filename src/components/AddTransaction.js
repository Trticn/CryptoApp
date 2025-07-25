import { useDispatch, useSelector } from 'react-redux';
import {
  changeTitle,
  changeQuantity,
  changeDescription,
  changeDate,
  changeType,
  resetForm,
} from '../store';

import { useState } from 'react';
import { useAddTransactionMutation, useLazyFetchHistoricalPriceQuery } from '../store';

import {
  CheckCircleIcon,
  XCircleIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  PlusCircleIcon,
  CalendarIcon,
} from '@heroicons/react/24/outline';

function AddTransaction() {
  const [addTransaction, results] = useAddTransactionMutation();

  const [triggerGetPrice, { isLoading }] = useLazyFetchHistoricalPriceQuery();
  const dispatch = useDispatch();
  const formData = useSelector((state) => state.transactionForm);
  const [notification, setNotification] = useState(null);
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!formData.title || !formData.quantity || !formData.date || !formData.type)
      throw new Error('Molimo popunite sva obavezna polja!');
      const rawDate = formData.date.split('T')[0]; // "2025-04-29T00:00:00" → "2025-04-29"
      const coinGeckoDate = rawDate.split('-').reverse().join('-'); // "29-04-2025"

      const priceResult = await triggerGetPrice({
        coinId: formData.title.toLowerCase(),
        date: coinGeckoDate,
      });

      if (priceResult.isError) throw new Error('Greška pri preuzimanju cene kriptovalute!');

      const priceAtTransaction = priceResult.data?.market_data.current_price['usd'];
      const totalValue = formData.quantity * priceAtTransaction;
  
      // Dodaj transakciju u bazu
      await addTransaction({
        title: formData.title.toLowerCase(),
        quantity: formData.quantity,
        description: formData.description,
        date: formData.date.split('T')[0],
        type: formData.type,
        priceAtTransaction,
        totalValue,
      });

      showNotification('Transakcija je uspešno dodata!', true);
      dispatch(resetForm());
    } catch (error) {
      console.log(error);
      showNotification(error.message, false);
    }
  };

  const showNotification = (message, isSuccess) => {
    setNotification({ message, isSuccess });
    setTimeout(() => setNotification(null), 2000);
  };

  const handleUseCurrentDate = () => {
    const now = new Date();

    // Formatiraj datum kao "YYYY-MM-DD"
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0'); // Mesec je 0-11 (+1 da bude 1-12)
    const day = String(now.getDate()).padStart(2, '0');

    const formattedDate = `${year}-${month}-${day}`; // "2025-04-05"

    dispatch(changeDate(formattedDate));
  };

  return (
    <div className="py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">

      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg rounded-2xl p-6 space-y-6 transition-colors">
          <h2 className="text-2xl font-semibold text-zinc-800 dark:text-zinc-100 flex items-center gap-2">
            <PlusCircleIcon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            Dodaj novu transakciju
          </h2>

          {notification && (
            <div
              className={`p-3 rounded-lg flex items-center text-sm font-medium shadow border
                ${notification.isSuccess
                  ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300 border-green-200 dark:border-green-700'
                  : 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-300 border-red-200 dark:border-red-700'}
              `}
            >
              {notification.isSuccess ? (
                <CheckCircleIcon className="w-5 h-5 mr-2" />
              ) : (
                <XCircleIcon className="w-5 h-5 mr-2" />
              )}
              {notification.message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5 ">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label
                  htmlFor="title"
                  className="block text-sm mb-1 text-zinc-600 dark:text-zinc-400"
                >
                  Kriptovaluta*
                </label>
                <input
                  id="title"
                  name="title"
                  type="text"
                  value={formData.title}
                  onChange={(e) => dispatch(changeTitle(e.target.value))}
                  placeholder="e.g. Bitcoin"
                  className="w-full py-2 px-4 outline-none rounded-xl bg-gray-100 dark:bg-gray-700 border border-transparent focus:border-blue-400 dark:focus:border-blue-500 focus:bg-white dark:focus:bg-gray-800 text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 transition-all duration-200 shadow-sm"
                />
              </div>

              <div>
                <label
                  htmlFor="quantity"
                  className="block text-sm mb-1 text-zinc-600 dark:text-zinc-400"
                >
                 Količina*
                </label>
                <input
                  id="quantity"
                  name="quantity"
                  type="number"
                  step="0.01"
                  value={formData.quantity}
                  onChange={(e) => dispatch(changeQuantity(+e.target.value))}
                  placeholder="0.00"
                  className="w-full py-2 px-4 outline-none rounded-xl bg-gray-100 dark:bg-gray-700 border border-transparent focus:border-blue-400 dark:focus:border-blue-500 focus:bg-white dark:focus:bg-gray-800 text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 transition-all duration-200 shadow-sm"
                />
              </div>
            </div>

            <div>
              <span className="block text-sm mb-1 text-zinc-600 dark:text-zinc-400">
                Tip transakcije*
              </span>
              <div className="grid grid-cols-2 gap-4">
                {['buy', 'sell'].map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => dispatch(changeType(type))}
                    className={`flex items-center justify-center px-4 py-2 rounded-xl border transition text-sm font-medium
                  ${
                    formData.type === type
                      ? type === 'buy'
                        ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300 border-green-300 dark:border-green-700'
                        : 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-300 border-red-300 dark:border-red-700'
                      : 'bg-zinc-50 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 border-zinc-300 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-700'
                  }
                `}
                  >
                    {type === 'buy' ? (
                      <ArrowUpIcon className="w-5 h-5 mr-2" />
                    ) : (
                      <ArrowDownIcon className="w-5 h-5 mr-2" />
                    )}
                    {type === 'buy' ? 'Kupi' : 'Prodaj'}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label
                  htmlFor="date"
                  className="block text-sm mb-1 text-zinc-600 dark:text-zinc-400"
                >
                  Datum*
                </label>
                <div className="flex gap-2">
                  <input
                    id="date"
                    name="date"
                    type="date"
                    value={formData.date}
                    onChange={(e) => dispatch(changeDate(e.target.value))}
                    className="flex-1 w-full py-2 px-4 outline-none rounded-xl bg-gray-100 dark:bg-gray-700 border border-transparent focus:border-blue-400 dark:focus:border-blue-500 focus:bg-white dark:focus:bg-gray-800 text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 transition-all duration-200 shadow-sm"
                  />
                
                  <button
                    type="button"
                    onClick={handleUseCurrentDate}
                    className="px-4 py-2 flex justify-center items-center rounded-xl bg-zinc-100 dark:bg-gray-700 text-zinc-700 dark:text-zinc-200 hover:bg-zinc-200 dark:hover:bg-gray-600 border border-zinc-200 dark:border-gray-700 transition"
                  >
                    <CalendarIcon className="w-4 h-4 inline mr-1" />
                    Danas
                  </button>
             
                </div>
              </div>
            </div>

            <div>
              <label
                htmlFor="description"
                className="block text-sm mb-1 text-zinc-600 dark:text-zinc-400"
              >
                Deskripcija
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={(e) => dispatch(changeDescription(e.target.value))}
                rows="3"
                placeholder="Optional notes..."
                className="w-full py-2 px-4 outline-none rounded-xl bg-gray-100 dark:bg-gray-700 border border-transparent focus:border-blue-400 dark:focus:border-blue-500 focus:bg-white dark:focus:bg-gray-800 text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 transition-all duration-200 shadow-sm"
              />
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading || results.isLoading}
                className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white font-semibold flex items-center justify-center transition"
              >
                {isLoading || results.isLoading ? (
                  <>
                    <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24" fill="none">
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                      />
                    </svg>
                    Saving...
                  </>
                ) : (
                  `${formData.type === 'buy' ? 'Buy' : 'Sell'} crypto`
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddTransaction;
