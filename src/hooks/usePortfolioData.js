// hooks/usePortfolioData.js
import { useMemo } from "react";
import { useFetchTransactionsQuery, useFetchCryptoCollectionQuery } from '../store'
import { groupTransactionsByCrypto, enrichGroupedTransactions } from "../helpers"


export const usePortfolioData = () => {
  const { data: allTransactions, error, isFetching } = useFetchTransactionsQuery();
  const { data: cryptoCollection } = useFetchCryptoCollectionQuery(
    allTransactions?.map((tr) => tr.title),
    {
      skip: !allTransactions,
      pollingInterval: 20000, // ⏱ osvežava svakih 30 sekundi
    }
  );
  

  const combined = useMemo(() => {
    if (!allTransactions || !cryptoCollection) return null;
    return allTransactions.map((transaction) => {
      const matchingCrypto = cryptoCollection.find(
        (crypto) => crypto.id.toLowerCase() === transaction.title.toLowerCase()
      );
      return {
        ...transaction,
        currentPrice: matchingCrypto?.current_price,
        symbol: matchingCrypto?.symbol,
        image: matchingCrypto?.image,
        marketCap: matchingCrypto?.market_cap,
        priceChange24h: matchingCrypto?.price_change_24h,
        priceChangePercentage24h: matchingCrypto?.price_change_percentage_24h,
        ath: matchingCrypto?.ath,
        atl: matchingCrypto?.atl,
        high24h: matchingCrypto?.high_24h,
        low24h: matchingCrypto?.low_24h,
        priceChangePercentage7d: matchingCrypto?.price_change_percentage_7d_in_currency,
        priceChangePercentage30d: matchingCrypto?.price_change_percentage_30d_in_currency,
        totalVolume: matchingCrypto?.total_volume,
      };
    });
  }, [allTransactions, cryptoCollection]);

  const portfolio = useMemo(() => {
    if (!combined) return null;
    const grouped = groupTransactionsByCrypto(combined);
    return enrichGroupedTransactions(grouped);
  }, [combined]);

  const {
    totalValue,
    totalInvested,
    totalProfit,
    change24hValue,
    change24hPercent,
    highestValueAssets
  } = useMemo(() => {
    if (!portfolio) {
      return {
        totalValue: 0,
        totalInvested: 0,
        totalProfit: 0,
        change24hValue: 0,
        change24hPercent: 0,
        highestValueAssets: []
      };
    }

    const totalVal = portfolio.reduce((sum, asset) => sum + asset.currentValue, 0);
    const totalInv = portfolio.reduce((sum, asset) => sum + asset.totalInvested, 0);
    const highestValueAssets =  portfolio
    .sort((a, b) => b.currentValue - a.currentValue)  // sortiraj opadajuće
    .slice(0, 3);                                     // uzmi prva 3
    const totalProfit = totalVal - totalInv;

    const change24hVal = portfolio.reduce((sum, asset) => {
      const percent = asset.priceChangePercentage24h;
      if (percent == null) return sum;
      return sum + (asset.currentValue * percent / 100);
    }, 0);

    const change24hPercent = totalVal > 0 ? (change24hVal / totalVal) * 100 : 0;

    return {
      totalValue: totalVal,
      totalInvested: totalInv,
      totalProfit: totalProfit,
      change24hValue: change24hVal,
      change24hPercent,
      highestValueAssets
    };
  }, [portfolio]);

  return {
    allTransactions,
    cryptoCollection,
    combined,
    portfolio,
    totalValue,
    totalInvested,
    totalProfit,
    change24hValue,
    change24hPercent,
    isFetching,
    highestValueAssets,
    error
  };
};
