import { useState, useEffect } from 'react';
import { formatNumber } from '../helpers';
import useHandleBack from '../hooks/useHandleBack';
import {
  ArrowsPointingOutIcon,
  ArrowsPointingInIcon,
  ArrowLeftIcon
} from '@heroicons/react/24/outline';
import { usePortfolioData } from '../hooks/usePortfolioData';
import CryptoModal from '../components/CryptoModal';
import PortfolioList from '../components/PortfolioList';
import ErrorScreen from '../components/ErrorScreen';

function PortfolioPage() {
  const { portfolio, isFetching, error, totalValue, totalInvested, totalProfit, change24hPercent } =
    usePortfolioData();
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [selectedCrypto, setSelectedCrypto] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleBack = useHandleBack();

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(console.error);
    } else {
      document.exitFullscreen?.();
    }
  };

  const openCryptoModal = (crypto) => {
    setSelectedCrypto(crypto);
    document.body.style.overflow = 'hidden';
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = 'visible';
    setSelectedCrypto(null);
  };

  if (isFetching)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Učitavam portfolio...</p>
        </div>
      </div>
    );

  if (error) return <ErrorScreen />;

  return (
    <div
      className={`${
        isFullscreen
          ? 'fixed inset-0 z-[9999]  bg-white dark:bg-gray-900  min-h-screen'
          : 'min-h-screen'
      } p-6 md:p-10 w-screen`}
    >
      <div className="mb-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mt-5">
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
            <h1 className='font-bold'>Tvoj Portfolio</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Pregled svih tvojih kripto investicija
            </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3 gap-4">
            {/* Ukupna vrednost */}
            <div className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-700 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-md p-6 hover:shadow-lg transition duration-300 hover:-translate-y-1">
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Ukupna vrednost</p>
              <p className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
                ${formatNumber(totalValue)}
              </p>
              <div
                className={`flex items-center text-sm ${
                  change24hPercent >= 0
                    ? 'text-green-600 dark:text-green-400'
                    : 'text-red-600 dark:text-red-400'
                }`}
              >
                <span>{change24hPercent >= 0 ? '▲' : '▼'}</span>
                <span className="ml-1">{formatNumber(change24hPercent)}% (24h)</span>
              </div>
            </div>

            {/* Ukupno uloženo */}
            <div className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-700 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-md p-6 hover:shadow-lg transition duration-300 hover:-translate-y-1">
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Ukupno uloženo</p>
              <p className="text-3xl font-bold text-gray-800 dark:text-white">
                ${formatNumber(totalInvested)}
              </p>
            </div>

            {/* Ukupan profit */}
            <div className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-700 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-md p-6 hover:shadow-lg transition duration-300 hover:-translate-y-1">
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Ukupan profit</p>
              <p
                className={`text-3xl font-bold mb-2 ${
                  totalProfit >= 0
                    ? 'text-green-600 dark:text-green-400'
                    : 'text-red-600 dark:text-red-400'
                }`}
              >
                ${formatNumber(totalProfit)}
              </p>
              <div
                className={`flex items-center flex-wrap gap-2 text-sm ${
                  totalProfit >= 0
                    ? 'text-green-600 dark:text-green-400'
                    : 'text-red-600 dark:text-red-400'
                }`}
              >
                <span>{totalProfit >= 0 ? '▲' : '▼'}</span>
                <span>
                  {totalInvested > 0
                    ? formatNumber((totalProfit / totalInvested) * 100, 2)
                    : '0.00'}
                  % ROI
                </span>
                <span
                  className={`px-2 py-0.5 rounded-full text-xs ${
                    totalProfit >= 0
                      ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300'
                      : 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300'
                  }`}
                >
                  {totalProfit >= 0 ? 'Dobit' : 'Gubitak'}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center mt-6 flex-wrap gap-2">
          <div className="text-sm text-gray-500 dark:text-gray-400">
            {portfolio
              ? `Prikazano ${portfolio.length} ${
                  portfolio.length === 1 ? 'kripto' : 'kriptovaluta'
                }`
              : ''}
          </div>
          <button
            onClick={toggleFullscreen}
            className="flex items-center gap-2 px-3 py-2 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
          >
            {isFullscreen ? (
              <>
                <ArrowsPointingInIcon className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                <span className="text-sm text-gray-700 dark:text-gray-300">Izađi</span>
              </>
            ) : (
              <>
                <ArrowsPointingOutIcon className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                <span className="text-sm text-gray-700 dark:text-gray-300">Fullscreen</span>
              </>
            )}
          </button>
        </div>
      </div>

      <PortfolioList portfolio={portfolio} openCryptoModal={openCryptoModal} />

      <CryptoModal isOpen={isModalOpen} onClose={closeModal} crypto={selectedCrypto} />
    </div>
  );
}

export default PortfolioPage;
