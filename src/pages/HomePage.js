// pages/HomePage.jsx
import React from "react";
import { FiArrowDownCircle } from "react-icons/fi";
import { usePortfolioData } from "../hooks/usePortfolioData";
import { Link } from "react-router-dom";
import { useSavePortfolioSnapshot } from "../hooks/useSavePortfolioSnapshot.js";
import Skeleton from "../components/Skeleton";
import CryptoListing from "../components/CryptoListing";
import BalanceCard from "../components/cards/BalanceCard";
import InvestmentCard from "../components/cards/InvestmentCard.js";
import GainerCard from "../components/cards/GainerCard";
import ErrorScreen from "../components/ErrorScreen";
import PortfolioChartSection from "../components/sections/PortfolioChart";
import InvestmentsSection from "../components/sections/InvestmentSection";
import TransactionsSection from "../components/sections/TransactionsSection";


function HomePage() {



  const {
    isFetching,
    error,
    totalValue,
    change24hPercent,
    highestValueAssets,
    allTransactions,
  } = usePortfolioData();

  useSavePortfolioSnapshot();

  if (error) return (
    <ErrorScreen 
      title="Greška pri učitavanju" 
      message="Došlo je do problema."
    />
  );

  const topGainer = highestValueAssets.length
    ? highestValueAssets.reduce((prev, current) =>
        prev.priceChangePercentage24h > current.priceChangePercentage24h
          ? prev
          : current
      )
    : null;

  return (
    <div className="pt-5 p-4 md:p-8">
      {/* Hero Section with Cards */}
      <div className="bg-gradient-to-b mb-8 from-gray-50 to-white dark:from-gray-800 dark:to-gray-700 rounded-2xl p-4 md:p-8 shadow-lg border border-gray-200 dark:border-gray-700">
        <div className="flex flex-col md:flex-row items-stretch gap-6 mb-8 justify-center relative z-10">
          {isFetching ? (
            <div className="space-y-3 p-4 w-full">
              <Skeleton className="h-40 w-full rounded-xl dark:bg-gray-700" times={3} />
            </div>
          ) : (
            <>
              <BalanceCard 
                totalValue={totalValue} 
                change24hPercent={change24hPercent} 
              />
              
              <InvestmentCard 
                asset={highestValueAssets[0]} 
              />
              
              <GainerCard 
                topGainer={topGainer} 
              />
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
      <div className="flex flex-col lg:flex-row gap-6 mb-8">
        {/* Left Section - Chart */}
        <PortfolioChartSection />
        
        {/* Right Section */}
        <div className="w-full lg:w-96 flex flex-col gap-6">
          <InvestmentsSection 
            assets={highestValueAssets} 
            isFetching={isFetching} 
          />
          
          <TransactionsSection 
            transactions={allTransactions} 
            isFetching={isFetching} 
          />
        </div>
      </div>

      <CryptoListing showThead={true} />
    </div>
  );
}

export default HomePage;