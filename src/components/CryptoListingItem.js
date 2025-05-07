import { formatNumber } from "../helpers";

function CryptoListingItem ({crypto}) {
    const { 
      name,
      symbol,
      image,
      current_price,
      price_change_percentage_24h,
      market_cap,
      total_volume,
      circulating_supply,
      ath, 
      ath_change_percentage,
      atl, 
      atl_change_percentage,
      id 
    } = crypto;
  
 
    
    return (
      <tr key={id} className="border-b hover:bg-gray-100 dark:hover:bg-gray-900 transition-all">
        {/* Name */}
        <td  className="p-4 min-h-[95px] flex items-center gap-3">
          <img src={image} alt={name} className="w-6 h-6" />
          <div>
            <p className="font-semibold text-gray-900 dark:text-gray-100">{name}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">{symbol.toUpperCase()}</p>
          </div>
        </td>
  
        {/* Price */}
        <td className="p-4 min-h-[95px] font-medium text-gray-800 dark:text-gray-200">
          ${formatNumber(current_price)}
        </td>
  
        {/* 24h % */}
        <td className={`p-4 font-medium min-h-[95px] ${price_change_percentage_24h >= 0 ? "text-green-500" : "text-red-500"}`}>
          {price_change_percentage_24h.toFixed(2)}%
        </td>
  
        {/* ATH (All-Time High) */}
      
  
        {/* Market Cap */}
        <td className="p-4 font-medium  min-h-[95px] text-gray-800 dark:text-gray-200">
          ${formatNumber(market_cap)}
        </td>
  
        {/* Volume (24h) */}
        <td className="p-4 font-medium min-h-[95px] text-gray-800 dark:text-gray-200">
          ${formatNumber(total_volume)}
        </td>
  
        {/* Circulating Supply */}
        <td className="p-4 font-medium min-h-[95px] text-gray-800 dark:text-gray-200">
          {formatNumber(circulating_supply)} {symbol.toUpperCase()}
        </td>

        <td className={`p-4 font-medium min-h-[95px] ${ath_change_percentage >= 0 ? "text-green-500" : "text-red-500"}`}>
         ${formatNumber(ath)} ({ath_change_percentage.toFixed(2)}%)
        </td>
  
        {/* ATL (All-Time Low) */}
        <td className={`p-4 font-medium min-h-[95px] ${atl_change_percentage >= 0 ? "text-green-500" : "text-red-500"}`}>
           ${atl.toFixed(2)} ({atl_change_percentage.toFixed(2)}%)
        </td>
  
       
      </tr>
    );
  };
  
  export default CryptoListingItem;
  