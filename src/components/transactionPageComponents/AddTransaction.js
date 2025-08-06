import { useDispatch, useSelector } from 'react-redux';
import {
  changeTitle,
  changeQuantity,
  changeDescription,
  changeDate,
  changeType,
  resetForm,
  showNottification,
} from '../../store';

import { useState } from 'react';
import { useAddTransactionMutation } from '../../store/apis/transactionsApi';
import { useLazyFetchHistoricalPriceQuery } from '../../store/apis/cryptoListingApi';
import {
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
  const [errorMessage, setErrorMessage] = useState(null);

  const showErrorMessage = (message, isSuccess) => {
    if (!isSuccess) {
      setErrorMessage({ message, isSuccess });
      setTimeout(() => setErrorMessage(null), 2000);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!formData.title || !formData.quantity || !formData.date || !formData.type) {
        throw new Error('Molimo popunite sva obavezna polja!');
      }

      const rawDate = formData.date.split('T')[0];
      const coinGeckoDate = rawDate.split('-').reverse().join('-');

      const priceResult = await triggerGetPrice({
        coinId: formData.title.toLowerCase(),
        date: coinGeckoDate,
      });

      if (priceResult.isError) throw new Error('Greška pri preuzimanju cene kriptovalute!');

      const priceAtTransaction = priceResult.data?.market_data.current_price['usd'];
      const totalValue = formData.quantity * priceAtTransaction;

      const data = await addTransaction({
        title: formData.title.toLowerCase(),
        quantity: formData.quantity,
        description: formData.description,
        date: formData.date.split('T')[0],
        type: formData.type,
        priceAtTransaction,
        totalValue,
      });

      if(data.error) throw data.error;

      dispatch(
        showNottification({
          message: data.data.message,
          type: 'success',
          duration: 2000,
          show: true,
        })
      );

      dispatch(resetForm());
    } catch (error) {
      showErrorMessage(error?.data?.message || 'Došlo je do greške, proverite internet konekciju.', false);
    }
  };

  const handleUseCurrentDate = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;
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


          {/* ERROR NOTIFIKACIJA */}
          {errorMessage && (
            <div className="p-3 rounded-lg flex items-center text-sm font-medium shadow border bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-300 border-red-200 dark:border-red-700">
              <XCircleIcon className="w-5 h-5 mr-2" />
              {errorMessage.message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label htmlFor="title" className="block text-sm mb-1 text-zinc-600 dark:text-zinc-400">
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
                <label htmlFor="quantity" className="block text-sm mb-1 text-zinc-600 dark:text-zinc-400">
                  Količina*
                </label>
                <input
                  id="quantity"
                  name="quantity"
                  type="number"
                  step="0.01"
                  value={formData.quantity === 0 ? '' : formData.quantity}
                  onChange={(e) => {
                    const val = e.target.value;
                    dispatch(changeQuantity(val === '' ? '' : +val));
                  }}
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
                        : 'bg-gray-100 dark:bg-gray-700 border border-transparent text-zinc-600 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-gray-600'
                    }`}
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
                <label htmlFor="date" className="block text-sm mb-1 text-zinc-600 dark:text-zinc-400">
                  Datum*
                </label>
                <div className="flex gap-2">
                  <input
                    id="date"
                    name="date"
                    type="date"
                    value={formData.date}
                    onChange={(e) => dispatch(changeDate(e.target.value))}
                    className="flex-1 w-full py-2 px-4 outline-none rounded-xl bg-gray-100 dark:bg-gray-700 border border-transparent focus:border-blue-400 dark:focus:border-blue-500 focus:bg-white dark:focus:bg-gray-800 text-gray-800 dark:text-white transition-all duration-200 shadow-sm"
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
              <label htmlFor="description" className="block text-sm mb-1 text-zinc-600 dark:text-zinc-400">
                Deskripcija
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={(e) => dispatch(changeDescription(e.target.value))}
                rows="5"
                placeholder="Opcionalna napomena..."
                className="w-full py-2 px-4 outline-none rounded-xl bg-gray-100 dark:bg-gray-700 border border-transparent focus:border-blue-400 dark:focus:border-blue-500 focus:bg-white dark:focus:bg-gray-800 text-gray-800 dark:text-white transition-all duration-200 shadow-sm"
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
                    Sačuvaj...
                  </>
                ) : (
                  `${formData.type === 'buy' ? 'Kupi' : 'Prodaj'} kriptovalutu`
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
