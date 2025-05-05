import { useDispatch, useSelector } from 'react-redux';
import { 
  changeTitle, 
  changeAmount, 
  changeDescription, 
  changeDate, 
  changeType, 
  resetForm 
} from '../store';

import { useFetchPopularCryptoQuery, useAddTransactionMutation, useFetchHistoricalPriceQuery } from '../store';
import { useState, useEffect } from 'react';

function TransactionAdd() {
  const dispatch = useDispatch();
  const formData = useSelector((state) => state.transactionForm);

  const { data: topCryptos, error, isFetching } = useFetchPopularCryptoQuery();
  const [addTransaction, results] = useAddTransactionMutation();

  const [selectedCoinId, setSelectedCoinId] = useState('');
  const selectedCoinData = topCryptos?.find(c => c.id === selectedCoinId);

  const currentPrice = selectedCoinData?.current_price || 0;
  const [historicalPrice, setHistoricalPrice] = useState(null);

  // Formatiranje datuma
  const [year, month, day] = formData.date.split('-');
  const formattedDate = `${day}-${month}-${year}`;

  // Koristi RTK Query za dobijanje istorijske cene kada se datum promeni
  const { data: historicalPriceData, error: historicalPriceError } = useFetchHistoricalPriceQuery(
    { coinId: selectedCoinId, date: formData.date && formData.date !== 'today' ? formData.date.split('-').reverse().join('-') : '' },
    { skip: formData.date === 'today' || !selectedCoinId }
  );

  useEffect(() => {
    if (historicalPriceData) {
      setHistoricalPrice(historicalPriceData?.market_data?.current_price?.usd || 0);
    }
  }, [historicalPriceData]);

  const handleSubmit =  (e) => {
    e.preventDefault();

    if (!selectedCoinId || !formData.amount || !formData.type) {
      alert('Please fill all required fields!');
      return;
    }

    const priceAtTransaction = formData.date === 'today' ? currentPrice : historicalPrice || 0;
    const totalValue = priceAtTransaction * formData.amount;

    try {
        addTransaction({
        coinId: selectedCoinId,
        title: formData.title,
        amount: formData.amount,
        description: formData.description,
        date: formData.date === 'today' ? new Date().toISOString() : new Date(formData.date).toISOString(),
        type: formData.type,
        priceAtTransaction,
        totalValue,
      })

      alert('Transaction added successfully!');
      dispatch(resetForm());
      setSelectedCoinId('');
    } catch (error) {
      console.error(error);
      alert('Error while adding transaction.');
    }
  };

  return (
<form 
  onSubmit={handleSubmit} 
  className="flex flex-col gap-4 p-4 bg-white dark:bg-gray-900 rounded-xl shadow-md"
>
  {/* Select Coin */}
  <select 
    value={selectedCoinId} 
    onChange={(e) => setSelectedCoinId(e.target.value)}
    className="p-2 border border-gray-300 dark:border-gray-700 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
  >
    <option value="">Select a coin</option>
    {topCryptos?.map((coin) => (
      <option key={coin.id} value={coin.id}>
        {coin.name}
      </option>
    ))}
  </select>

  {/* Title */}
  <input
    type="text"
    placeholder="Transaction title"
    value={formData.title}
    onChange={(e) => dispatch(changeTitle(e.target.value))}
    className="p-2 border border-gray-300 dark:border-gray-700 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
  />

  {/* Amount */}
  <input
    type="number"
    placeholder="Amount"
    value={formData.amount || ''}
    onChange={(e) => dispatch(changeAmount(Number(e.target.value)))}
    className="p-2 border border-gray-300 dark:border-gray-700 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
  />

  {/* Description */}
  <textarea
    placeholder="Description (optional)"
    value={formData.description}
    onChange={(e) => dispatch(changeDescription(e.target.value))}
    className="p-2 border border-gray-300 dark:border-gray-700 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
  />

  {/* Date */}
  <div className="flex gap-2 items-center">
    <label className="text-gray-700 dark:text-gray-300">Date:</label>
    <input
      type="date"
      value={formData.date === 'today' ? new Date().toISOString().slice(0, 10) : formData.date}
      onChange={(e) => dispatch(changeDate(e.target.value))}
      className="p-2 border border-gray-300 dark:border-gray-700 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
    />
    <button 
      type="button" 
      onClick={() => dispatch(changeDate('today'))}
      className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
    >
      Today
    </button>
  </div>

  {/* Type */}
  <select 
    value={formData.type} 
    onChange={(e) => dispatch(changeType(e.target.value))}
    className="p-2 border border-gray-300 dark:border-gray-700 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
  >
    <option value="">Select type</option>
    <option value="buy">Buy</option>
    <option value="sell">Sell</option>
  </select>

  {/* Show Price */}
  <div className="text-sm text-gray-600 dark:text-gray-300">
    Price ({formData.date === 'today' ? 'today' : 'on selected date'}): {formData.date === 'today' ? currentPrice : (historicalPrice || 'Loading...')}$ 
  </div>

  {/* Total Value */}
  <div className="text-sm font-bold text-gray-800 dark:text-white">
    Total Value: {((formData.date === 'today' ? currentPrice : (historicalPrice || 0)) * formData.amount).toFixed(2)}$
  </div>

  <button 
    type="submit" 
    className="p-2 bg-green-500 text-white rounded hover:bg-green-600"
  >
    Add Transaction
  </button>
</form>


  );
}

export default TransactionAdd;
