import { Link } from 'react-router-dom';
import PortfolioListItem from './PortfolioListItem';
import { ChartBarIcon } from '@heroicons/react/24/outline';

function PortfolioList({ portfolio, openCryptoModal }) {




  
  if (!portfolio)
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="bg-blue-100 dark:bg-blue-900/30 p-4 rounded-full mb-4">
          <ChartBarIcon className="w-8 h-8 text-blue-500 dark:text-blue-400" />
        </div>
        <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
          Portfolio je prazan
        </h3>
        <p className="text-gray-500 dark:text-gray-400 max-w-md mb-4">
          Trenutno nemaš nijednu kripto transakciju. Kada dodaš svoju prvu transakciju, ovde ćeš
          videti pregled svog portfolija.
        </p>
        <Link
          to="/add-transaction"
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
        >
          Dodaj prvu transakciju
        </Link>
      </div>
    );

  return (
    <div
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6
      "
    >
      {portfolio.map((asset) => (
        <PortfolioListItem
          key={`${asset.title}-${asset.symbol}`}
          asset={asset}
          onClick={() => openCryptoModal(asset)}
        />
      ))}
    </div>
  );
}

export default PortfolioList;
