import { parseISO, isAfter, format, compareAsc } from 'date-fns';

/**
 * Parsira i filtrira snapshotove po datumu od
 */
export function filterSnapshotsByDate(snapshots, fromDate) {
  return snapshots
    .map((entry) => ({ ...entry, parsedDate: parseISO(entry.date) }))
    .filter(
      (entry) =>
        isAfter(entry.parsedDate, fromDate) || entry.parsedDate.getTime() === fromDate.getTime(),
    );
}

/**
 * Grupisanje i vraćanje najkasnijih snapshota po mesecu (YYYY-MM)
 */
export function groupByLatestPerMonth(snapshots) {
  const map = new Map();

  for (const entry of snapshots) {
    const key = format(entry.parsedDate, 'yyyy-MM');
    const existing = map.get(key);
    if (!existing || entry.parsedDate > existing.parsedDate) {
      map.set(key, entry);
    }
  }

  return Array.from(map.values());
}

/**
 * Grupisanje i vraćanje najkasnijih snapshota po godini (YYYY)
 */
export function groupByLatestPerYear(snapshots) {
  const map = new Map();

  for (const entry of snapshots) {
    const key = format(entry.parsedDate, 'yyyy');
    const existing = map.get(key);
    if (!existing || entry.parsedDate > existing.parsedDate) {
      map.set(key, entry);
    }
  }

  return Array.from(map.values());
}

/**
 * Formatira snapshotove u podatke za chart
 */
export function formatChartData(snapshots) {
  return snapshots
    .sort((a, b) => compareAsc(a.parsedDate, b.parsedDate))
    .map((entry) => ({
      date: entry.date,
      value: entry.totalValue,
      invested: entry.totalInvested,
      profit: entry.totalProfit,
    }));
}

export const groupTransactionsByCrypto = (combined) => {
  if (!combined) return {};

  return combined.reduce((acc, tx) => {
    const key = tx.title.toLowerCase();

    if (!acc[key]) {
      acc[key] = {
        title: tx.title,
        symbol: tx.symbol,
        image: tx.image,
        currentPrice: tx.currentPrice,
        marketCap: tx.marketCap,
        priceChange24h: tx.priceChange24h,
        priceChangePercentage24h: tx.priceChangePercentage24h,
        ath: tx.ath,
        atl: tx.atl,
        allTransactions: [],
      };
    }

    acc[key].allTransactions.push({
      date: tx.date,
      description: tx.description,
      totalValue: tx.totalValue,
      type: tx.type,
      priceAtTransaction: tx.priceAtTransaction,
      quantity: tx.quantity,
    });

    return acc;
  }, {});
};

//Statistika na osnovu grupiranja

export const enrichGroupedTransactions = (grouped) => {
  return Object.values(grouped).map((group) => {
    // Filter samo "buy" transakcije
    const buyTransactions = group.allTransactions.filter((tx) => tx.type !== 'sell');

    const totalQuantity = buyTransactions.reduce((sum, tx) => sum + tx.quantity, 0);
    const totalInvested = buyTransactions.reduce(
      (sum, tx) => sum + tx.quantity * tx.priceAtTransaction,
      0,
    );

    const averageBuyPrice = totalQuantity > 0 ? totalInvested / totalQuantity : 0;
    const currentValue = totalQuantity * group.currentPrice;
    const profit = currentValue - totalInvested;
    const profitPercent = totalInvested > 0 ? (profit / totalInvested) * 100 : 0;

    return {
      ...group,
      totalQuantity,
      totalInvested,
      averageBuyPrice,
      currentValue,
      profit,
      profitPercent,
      allTransactions: group.allTransactions.map(
        ({ date, description, totalValue, type, priceAtTransaction, quantity }) => ({
          date,
          description,
          totalValue,
          type,
          priceAtTransaction,
          quantity,
        }),
      ),
    };
  });
};

// Reusable komponenta za info red
export const InfoRow = ({ label, value, className = '' }) => (
  <div className="flex justify-between items-center ">
    <span className="text-gray-500">{label}:</span>
    <span className={`font-medium  ${className ? className : 'text-gray-900 dark:text-gray-300'}`}>
      {value}
    </span>
  </div>
);

// Helper funkcija za formatiranje vrednosti
export const formatValue = (value, decimals = 2) => {
  if (value == null || isNaN(value)) {
    return 'N/A';
  }
  return value.toFixed(decimals);
};

export const formatDate = (transaction) => {
  const [year, month, day] = transaction.date.split('-');
  return `${day}/${month}/${year}`;
};

//For Crypto detail
export function formatDateTime(isoString) {
  const date = new Date(isoString);

  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Meseci su 0-indeksirani
  const year = date.getFullYear();

  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');

  return `${day}/${month}/${year}, ${hours}:${minutes}`;
}

export function formatNumber(num) {
  if (num == null || isNaN(num) || !isFinite(num) || num === 0) return 'N/A';

  if (num >= 1_000_000_000 || num <= -1_000_000_000) {
    return (num / 1_000_000_000).toFixed(2) + 'B';
  }

  if (num >= 1_000_000 || num <= -1_000_000) {
    return (num / 1_000_000).toFixed(2) + 'M';
  }

  if (num >= 1_000 || num <= -1_000) {
    return (num / 1_000).toFixed(2) + 'K';
  }

  if (num >= 1 || num <= -1) {
    return num.toFixed(2);
  }

  if (num >= 0.01 || num <= -0.01) {
    return num.toFixed(4);
  }

  if (num >= 0.000001 || num <= -0.000001) {
    return num.toFixed(6);
  }

  return Math.abs(num);
}
