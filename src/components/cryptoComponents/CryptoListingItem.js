import { formatNumber } from '../../helpers';
import { useAddCryptoToWatchlistMutation, useRemoveCryptoFromWatchlistMutation } from '../../store/apis/watchlistApi';
import Button from '../Button'
import { Link } from 'react-router-dom';


function CryptoListingItem({ crypto,onRemove }) {
  const [addCryptoToWatchlist, results] = useAddCryptoToWatchlistMutation();
  const [removeCryptoFromWatchlist, removeResults] = useRemoveCryptoFromWatchlistMutation();

  const {
    name,
    symbol,
    image,
    current_price,
    price_change_percentage_24h,
    market_cap,
    total_volume,
    circulating_supply,
    ath,
    ath_change_percentage,
    atl,
    atl_change_percentage,
    id,
  } = crypto;

  const toggleWatchlist = () => {
    if (crypto.isWatchlist) {
      removeCryptoFromWatchlist(crypto);
      onRemove?.()
    } else {
      addCryptoToWatchlist({
        id: crypto.id,
      });
    }
  };


  return (
    <tr key={id} className="border-b hover:bg-gray-100 dark:hover:bg-gray-900 transition-all">
      <td className="min-h-[115px] text-center">
        <div className="flex justify-center items-center h-full">
          <Button
            loading={results.isLoading || removeResults.isLoading}
            onClick={toggleWatchlist}
            className={`text-yellow-400 hover:text-yellow-500 transition text-xl min-w-[40px] h-[40px]`}
            title="Dodaj u favorite"
          >
            {crypto.isWatchlist ? '★' : '☆'}
          </Button>
        </div>
      </td>

      {/* Name */}
      <td className="p-4 min-h-[115px] flex items-center ">
        <Link to={`/search/${crypto.id}`} className="flex items-center space-x-2 gap-1 hover:underline focus:outline-none">
          <img src={image} alt={name} className="w-6 h-6" />
          <div>
            <p className="font-semibold text-gray-900 dark:text-gray-100">{name}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">{symbol.toUpperCase()}</p>
          </div>
        </Link>
      </td>

      {/* Price */}
      <td className="p-4 min-h-[115px] font-medium text-gray-800 dark:text-gray-200">
        ${formatNumber(current_price)}
      </td>

      {/* 24h % */}
      <td
        className={`p-4 font-medium min-h-[115px] ${
          price_change_percentage_24h >= 0 ? 'text-green-500' : 'text-red-500'
        }`}
      >
        {price_change_percentage_24h.toFixed(2)}%
      </td>

      {/* ATH (All-Time High) */}

      {/* Market Cap */}
      <td className="p-4 font-medium  min-h-[115px] text-gray-800 dark:text-gray-200">
        ${formatNumber(market_cap)}
      </td>

      {/* Volume (24h) */}
      <td className="p-4 font-medium min-h-[115px] text-gray-800 dark:text-gray-200">
        ${formatNumber(total_volume)}
      </td>

      {/* Circulating Supply */}
      <td className="p-4 font-medium min-h-[115px] text-gray-800 dark:text-gray-200">
        {formatNumber(circulating_supply)} {symbol.toUpperCase()}
      </td>

      <td
        className={`p-4 font-medium min-h-[115px] ${
          ath_change_percentage >= 0 ? 'text-green-500' : 'text-red-500'
        }`}
      >
        ${formatNumber(ath)} ({ath_change_percentage.toFixed(2)}%)
      </td>

      {/* ATL (All-Time Low) */}
      <td
        className={`p-4 font-medium min-h-[115px] ${
          atl_change_percentage >= 0 ? 'text-green-500' : 'text-red-500'
        }`}
      >
        ${formatNumber(atl)} ({atl_change_percentage.toFixed(2)}%)
      </td>
    </tr>
  );
}

export default CryptoListingItem;
