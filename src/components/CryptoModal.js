import { XMarkIcon } from '@heroicons/react/24/outline';
import { formatValue, InfoRow } from '../helpers';



function CryptoModal ({ crypto, onClose }){
  if(!crypto) return;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
    <div className="bg-white dark:bg-gray-900 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
      <div className="sticky top-0 bg-white dark:bg-gray-900 p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <img 
            src={crypto.image} 
            alt={crypto.title} 
            className="w-10 h-10 rounded-full"
          />
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            {crypto.title} <span className="text-gray-500 dark:text-gray-400 uppercase text-sm">{crypto.symbol}</span>
          </h2>
        </div>
        <button 
          onClick={onClose}
          className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          <XMarkIcon className="w-6 h-6 text-gray-500 dark:text-gray-300" />
        </button>
      </div>
  
      <div className="p-6 bg-gradient-to-b mb-8 from-gray-50 to-white dark:from-gray-800 dark:to-gray-700">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Investicije */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Tvoje investicije</h3>
            <div className="space-y-3 ">
              <InfoRow  label="Ukupna količina" value={formatValue(crypto.totalQuantity)} />
              <InfoRow label="Prosečna kupovna cena" value={`$${formatValue(crypto.averageBuyPrice, 4)}`} />
              <InfoRow label="Ukupno uloženo" value={`$${formatValue(crypto.totalInvested)}`} />
              <InfoRow label="Trenutna vrednost" value={`$${formatValue(crypto.currentValue)}`} />
              <InfoRow 
                label="Profit" 
                value={`$${formatValue(crypto.profit)} (${formatValue(crypto.profitPercent, 2)}%)`}
                className={crypto.profit >= 0 ? 'text-green-500 font-medium' : 'text-red-500 font-medium'}
              />
            </div>
          </div>
  
          {/* Tržišni podaci */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Tržišni podaci</h3>
            <div className="space-y-3">
              <InfoRow label="Trenutna cena" value={`$${formatValue(crypto.currentPrice, 4)}`} />
              <InfoRow 
                label="Promena 24h" 
                value={`${crypto.priceChange24h >= 0 ? '+' : ''}${formatValue(crypto.priceChange24h, 2)} (${formatValue(crypto.priceChangePercentage24h, 2)}%)`}
                className={crypto.priceChange24h >= 0 ? 'text-green-500' : 'text-red-500'}
              />
              <InfoRow label="Tržišna kapitalizacija" value={`$${formatValue(crypto.marketCap)}`} />
              <InfoRow label="ATH" value={`$${formatValue(crypto.ath, 4)}`} />
              <InfoRow label="ATL" value={`$${formatValue(crypto.atl, 4)}`} />
            </div>
          </div>
        </div>
  
        {/* Tabela transakcija */}
        <div className="mt-8">
          <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Tvoje transakcije ({crypto.allTransactions.length})</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-800">
                <tr>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Datum</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Tip</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Količina</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Cena</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Ukupno</th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
                {crypto.allTransactions.map((tx, index) => (
                  <tr key={index}>
                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">
                      {new Date(tx.date).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap text-sm font-medium">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        tx.type === 'buy' 
                          ? 'bg-green-100 text-green-800 dark:bg-green-800/20 dark:text-green-400' 
                          : 'bg-red-100 text-red-800 dark:bg-red-800/20 dark:text-red-400'
                      }`}>
                        {tx.type === 'buy' ? 'Kupovina' : 'Prodaja'}
                      </span>
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">
                      {formatValue(tx.quantity)}
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">
                      ${formatValue(tx.priceAtTransaction, 4)}
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">
                      ${formatValue(tx.quantity * tx.priceAtTransaction)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
  
      <div className="p-4 border-t border-gray-200 dark:border-gray-700 flex justify-end">
      <button
  onClick={onClose}
  className="px-5 py-2 rounded-2xl bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 font-medium shadow-sm hover:bg-gray-200 dark:hover:bg-gray-700 transition"
>
  Zatvori
</button>

      </div>
    </div>
  </div>
  
  );
};

export default CryptoModal;