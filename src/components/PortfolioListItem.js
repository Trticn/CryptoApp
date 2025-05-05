import { formatValue,InfoRow } from "../helpers";
import { ArrowUpIcon,ArrowDownIcon,ArrowsPointingOutIcon } from "@heroicons/react/24/outline";

function PortfolioListItem({ asset, onClick }) {
    const profitPositive = asset.profit >= 0;

  
    return (
      <div
        onClick={onClick}
        className={`rounded-xl p-5 shadow-sm transition-all duration-300 cursor-pointer border relative overflow-hidden group  ${
          profitPositive
            ? 'bg-green-50 border-green-200 dark:bg-green-900/20 dark:hover:bg-green-900/30 dark:border-green-800'
            : 'bg-red-50 hover:bg-red-100 border-red-200 dark:bg-red-900/20  dark:border-red-800'
        }`}
      >
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 dark:group-hover:bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <ArrowsPointingOutIcon className="w-10 h-10 text-gray-700 dark:text-gray-300" />
        </div>
  
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-3">
            <img
              src={asset.image}
              alt={asset.title}
              className="w-9 h-9 rounded-full"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'https://via.placeholder.com/36';
              }}
            />
            <div>
              <h2 className="text-md font-semibold text-gray-900 dark:text-white">{asset.title}</h2>
              <span className="text-xs text-gray-500 dark:text-gray-400 uppercase">{asset.symbol}</span>
            </div>
          </div>
          <div
            className={`flex items-center gap-1 text-sm font-medium ${
              profitPositive ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
            }`}
          >
            {profitPositive ? <ArrowUpIcon className="w-4 h-4" /> : <ArrowDownIcon className="w-4 h-4" />}
            {formatValue(asset.profitPercent, 2)}%
          </div>
        </div>
  
        <div className="space-y-2 text-sm">
          <InfoRow   label="Količina" value={formatValue(asset.totalQuantity)} />
          <InfoRow label="Prosečna cena" value={`$${formatValue(asset.averageBuyPrice, 4)}`} />
          <InfoRow label="Trenutna cena" value={`$${formatValue(asset.currentPrice, 4)}`} />
          <InfoRow  label="Uloženo" value={`$${formatValue(asset.totalInvested)}`} />
          <InfoRow  label="Vrednost" value={`$${formatValue(asset.currentValue)}`} />
          <InfoRow label="Profit" value={`$${formatValue(asset.profit)}`}
            className={profitPositive ? 'text-green-700 dark:text-green-300 font-medium' : 'text-red-700 dark:text-red-300 font-medium'}
          />
        </div>
      </div>
    );
  }
  export default PortfolioListItem;
  