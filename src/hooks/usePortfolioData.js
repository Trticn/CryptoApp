// hooks/usePortfolioData.js
import { useMemo } from 'react';
import { useFetchTransactionsQuery, useFetchCryptoCollectionQuery } from '../store';
import { groupTransactionsByCrypto, enrichGroupedTransactions } from '../helpers';

export const usePortfolioData = () => {
  const {
    data: allTransactions,
    error: errorTransactions,
    isFetching: isFetchingTransactions,
  } = useFetchTransactionsQuery();

  
  
  const {
    data: cryptoCollection,
    error: errorCollection,
    isFetching: isFetchingCollection,
  } = useFetchCryptoCollectionQuery(
    allTransactions
    ? [...new Set(allTransactions.map(tr => tr.title))]
    : []
  ,
    {
      skip: !allTransactions || allTransactions.length === 0,
      pollingInterval: 30000,
    },
  );

  console.log(cryptoCollection)
    

  // Kreiraj mapu za brzi pristup crypto podacima
  const cryptoMap = useMemo(() => {
    if (!cryptoCollection) return {};
    return cryptoCollection.reduce((acc, crypto) => {
      acc[crypto.id.toLowerCase()] = crypto;
      return acc;
    }, {});
  }, [cryptoCollection]);

  // Kombinuj transakcije sa odgovarajućim crypto podacima
  const combined = useMemo(() => {
    if (!allTransactions || !cryptoCollection) return null;
    return allTransactions.map((transaction) => {
      const matchingCrypto = cryptoMap[transaction.title.toLowerCase()];
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
  }, [allTransactions, cryptoMap, cryptoCollection]);

  // Grupisanje i obogaćivanje portfolija
  const portfolio = useMemo(() => {
    if (!combined) return null;
    const grouped = groupTransactionsByCrypto(combined);
    return enrichGroupedTransactions(grouped);
  }, [combined]);

  // Statistika portfolija (memoizovano)
  const analytics = useMemo(() => {
    if (!portfolio) {
      return {
        totalValue: 0,
        totalInvested: 0,
        totalProfit: 0,
        change24hValue: 0,
        change24hPercent: 0,
        topGainer: [],
        highestValueAssets: [],
      };
    }

    let totalValue = 0;
    let totalInvested = 0;
    let change24hValue = 0;

    const sorted = [...portfolio].sort((a, b) => b.currentValue - a.currentValue);
    const highestValueAssets = sorted.slice(0, 3);
    const topGainer = [...portfolio].sort(
      (a, b) => b.priceChangePercentage24h - a.priceChangePercentage24h,
    );
    for (const asset of portfolio) {
      totalValue += asset.currentValue;
      totalInvested += asset.totalInvested;
      if (asset.priceChangePercentage24h != null) {
        change24hValue += (asset.currentValue * asset.priceChangePercentage24h) / 100;
      }
    }

    const totalProfit = totalValue - totalInvested;
    const change24hPercent = totalValue > 0 ? (change24hValue / totalValue) * 100 : 0;

    return {
      totalValue,
      totalInvested,
      totalProfit,
      change24hValue,
      change24hPercent,
      highestValueAssets,
      topGainer,
    };
  }, [portfolio]);

  return {
    allTransactions,
    cryptoCollection,
    combined,
    portfolio,
    isFetching: isFetchingTransactions || isFetchingCollection,
    error: errorTransactions || errorCollection,
    ...analytics,
  };
};
