function MetricCard({ title, value, change, icon, additionalText }) {
  const changeClass =
    change >= 0 ? 'text-green-500 dark:text-green-400' : 'text-red-500 dark:text-red-400';

  return (
    <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg border border-gray-200 dark:border-gray-600">
      <div className="flex items-center justify-between mb-2">
        <p className="text-sm text-gray-500 dark:text-gray-400">{title}</p>
        <div className="text-gray-400">{icon}</div>
      </div>
      <p className="font-semibold text-gray-800 dark:text-white mb-1">{value}</p>

      {change !== undefined && (
        <p className={`text-sm ${changeClass}`}>
          {change >= 0 ? '+' : ''}
          {typeof change === 'number' ? change.toFixed(2) : change}%
        </p>
      )}
      {additionalText && (
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{additionalText}</p>
      )}
    </div>
  );
}

export default MetricCard;
