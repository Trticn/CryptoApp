import { FiArrowDownCircle } from 'react-icons/fi';
import { usePortfolioData } from '../hooks/usePortfolioData';
import { Link } from 'react-router-dom';
// import { useSavePortfolioSnapshot } from '../hooks/useSavePortfolioSnapshot.js';
import Skeleton from '../components/Skeleton';
import CryptoListing from '../components/cryptoComponents/CryptoListing';
import BalanceCard from '../components/homepage/cards/BalanceCard.js';
import InvestmentCard from '../components/homepage/cards/InvestmentCard.js';
import GainerCard from '../components/homepage/cards/GainerCard.js';
import PortfolioChartSection from '../components/homepage/sections/PortfolioChart.js';
import InvestmentsSection from '../components/homepage/sections/InvestmentSection.js';
import TransactionsSection from '../components/homepage/sections/TransactionsSection.js';
// import ErrorScreen from '../components/ErrorScreen.js';

function HomePage() {
  const {
    isFetching,
    totalValue,
    change24hPercent,
    topGainer,
    highestValueAssets,
    allTransactions,
    error
  } = usePortfolioData();

  return (
    <div className="pt-5 p-4 md:p-8">
      {/* Hero Section with Cards */}
      <div className="bg-gradient-to-b mb-8 from-gray-50 to-white dark:from-gray-800 dark:to-gray-700 rounded-2xl p-4 md:p-8 shadow-lg border border-gray-200 dark:border-gray-700">
        <div className="flex flex-col md:flex-col lg:flex-row gap-1 items-stretch mb-8 justify-center relative z-10">
          {isFetching ? (
            <div className="flex flex-col md:flex-col lg:flex-row p-6 w-full">
              <Skeleton className="h-40 w-full rounded-xl dark:bg-gray-700" times={3} />
            </div>
          ) : (
            <>
              <BalanceCard totalValue={totalValue} change24hPercent={change24hPercent} />

              <InvestmentCard asset={highestValueAssets[0]} />

              <GainerCard topGainer={topGainer[0]} />
            </>
          )}
        </div>

        <div className="flex justify-center">
          <Link
            to="/add-transaction"
            className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-full font-medium text-base shadow-lg hover:shadow-blue-500/30 transition-all hover:scale-105 active:scale-95"
          >
            <FiArrowDownCircle className="text-lg" />
            Uplata / Isplata
          </Link>
        </div>
      </div>

      {/* Main Content Below */}
      <div className="flex flex-col xl:flex-row gap-6 mb-8 items-stretch">
        {/* Leva strana: grafikon zauzima sav raspoloživi prostor i iste je visine kao desna strana */}
        <div className="flex-1">
          <PortfolioChartSection />
        </div>

        {/* Desna strana: investicije i transakcije */}
        <div className="w-full xl:w-96 flex flex-col gap-6">
          <InvestmentsSection assets={highestValueAssets} isFetching={isFetching} error={error} />

          <TransactionsSection transactions={allTransactions} isFetching={isFetching} error = {error} />
        </div>
      </div>

      <CryptoListing showThead={true} />
    </div>
  );
}

export default HomePage;
