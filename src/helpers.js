//Grupiranje transakcija

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
    return Object.values(grouped).map(group => {
      const totalQuantity = group.allTransactions.reduce((sum, tx) => sum + tx.quantity, 0);
      const totalInvested = group.allTransactions.reduce((sum, tx) => sum + (tx.quantity * tx.priceAtTransaction), 0);
      const averageBuyPrice = totalInvested / totalQuantity;
      const currentValue = totalQuantity * group.currentPrice;
      const profit = currentValue - totalInvested;
      const profitPercent = (profit / totalInvested) * 100;
  
      return {
        ...group,
        totalQuantity,
        totalInvested,
        averageBuyPrice,
        currentValue,
        profit,
        profitPercent,
        allTransactions: group.allTransactions.map(({ date, description, totalValue, type, priceAtTransaction,quantity }) => ({
          date,
          description,
          totalValue,
          type,
          priceAtTransaction,
          quantity
        })),
      };
    });
  };
  

  // Reusable komponenta za info red
  export const InfoRow = ({ label, value, className = '' }) => (
    <div className="flex justify-between items-center ">
      <span className="text-gray-500">{label}:</span>
      <span className={`font-medium  ${className ? className : 'text-gray-900 dark:text-gray-300'}`}>{value}</span>
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
  
  
  
  
  