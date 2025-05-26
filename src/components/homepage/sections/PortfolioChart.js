import { useState, useMemo } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';
import { InformationCircleIcon } from '@heroicons/react/24/outline';
import { useGetPortfolioSnapshotsQuery } from '../../../store';
import { subDays, subMonths, subYears } from 'date-fns';
import {
  filterSnapshotsByDate,
  groupByLatestPerMonth,
  groupByLatestPerYear,
  formatChartData,
} from '../../../helpers';
import Skeleton from '../../Skeleton';

export default function PortfolioChartSection() {
  const { data: snapshots = [], isFetching, error } = useGetPortfolioSnapshotsQuery();
  const [timeRange, setTimeRange] = useState('month');

  const chartData = useMemo(() => {
    if (!snapshots || snapshots.length === 0) return [];

    const now = new Date();
    let fromDate;

    switch (timeRange) {
      case 'week':
        fromDate = subDays(now, 7);
        break;
      case 'month':
        fromDate = subMonths(now, 1);
        break;
      case 'year':
        fromDate = subYears(now, 1);
        break;
      case 'all':
      default:
        fromDate = new Date(0);
    }

    const filtered = filterSnapshotsByDate(snapshots, fromDate);

    let grouped;

    if (timeRange === 'year') {
      grouped = groupByLatestPerMonth(filtered);
    } else if (timeRange === 'all') {
      grouped = groupByLatestPerYear(filtered);
    } else {
      grouped = filtered;
    }

    return formatChartData(grouped);
  }, [snapshots, timeRange]);

  const lineColors = {
    value: '#6366f1',
    invested: '#f59e0b',
    profit: '#10b981',
    change: '#ef4444',
    loss: '#991b1b',
  };

  let content;

  if (isFetching) {
    content = (
      <div className="space-y-3 w-full">
        <Skeleton className="h-80 w-full rounded-xl dark:bg-gray-700" times={1} />
      </div>
    );
  } else if (error) {
    content = (
      <div className="p-4 m-4 rounded-2xl border border-red-300 dark:border-red-700 bg-red-50 dark:bg-red-900/20 shadow-sm">
        <div className="flex items-center gap-3">
          <InformationCircleIcon className="h-6 w-6 text-red-600 dark:text-red-400" />
          <p className="text-sm text-red-800 dark:text-red-300">
            Došlo je do greške prilikom učitavanja transakcija. Pokušaj ponovo kasnije.
          </p>
        </div>
      </div>
    );
  } else if (snapshots.length === 0) {
    content = (
      <div className="p-4 sm:p-6 m-4 rounded-2xl border border-blue-300 dark:border-blue-800  shadow-sm">
        <div className="flex items-start items-center gap-3">
          <InformationCircleIcon className="h-6 w-6 text-blue-600 dark:text-blue-400 mt-1 sm:mt-0" />
          <p className="text-sm text-blue-800 dark:text-blue-300">
            Nema pronađenih podataka za portfolio
          </p>
        </div>
      </div>
    );
  } else {
    content = (
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData} margin={{ top: 10, right: 20, left: -10, bottom: 10 }}>
          <CartesianGrid strokeDasharray="4 4" stroke="#e5e7eb" />

          <XAxis
            dataKey="date"
            tick={{ fontSize: 12, fill: '#6b7280' }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(date) => {
              const d = new Date(date);
              if (timeRange === 'week') {
                return `${d.getDate()}. ${d.toLocaleString('default', {
                  month: 'short',
                })}`;
              } else if (timeRange === 'month') {
                return `${d.getDate()}.`;
              } else if (timeRange === 'year') {
                return d.toLocaleString('default', { month: 'short' });
              }
              return d.getFullYear().toString();
            }}
          />

          <YAxis
            tick={{ fontSize: 12, fill: '#6b7280' }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(value) => `$${value.toLocaleString()}`}
          />

          <Tooltip
            contentStyle={{
              backgroundColor: 'white',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              fontSize: '13px',
              padding: '10px',
            }}
            labelStyle={{ color: '#374151', fontWeight: 500 }}
            itemStyle={{ color: '#4b5563' }}
            formatter={(value, name) => [`${name}: $${value.toFixed(2)}`]}
            labelFormatter={(date) => {
              const [year, month, day] = date.split('-');
              return `${day}/${month}/${year}`;
            }}
          />

          <Legend
            wrapperStyle={{
              fontSize: '13px',
              paddingTop: '10px',
              color: '#6b7280',
            }}
          />

          <Line
            type="monotone"
            dataKey="value"
            stroke={lineColors.value}
            strokeWidth={2.5}
            dot={{ r: 3 }}
            activeDot={{ r: 5 }}
            name="Ukupna Vrednost"
          />
          <Line
            type="monotone"
            dataKey="invested"
            stroke={lineColors.invested}
            strokeWidth={2.5}
            dot={{ r: 3 }}
            activeDot={{ r: 5 }}
            name="Uloženo"
          />
          <Line
            type="monotone"
            dataKey="profit"
            stroke={lineColors.profit}
            strokeWidth={2.5}
            dot={{ r: 3 }}
            activeDot={{ r: 5 }}
            name="Profit"
          />
        </LineChart>
      </ResponsiveContainer>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 h-full rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700 flex flex-col flex-wrap min-h-[400px]">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
        <h2 className="text-medium font-bold text-gray-800 dark:text-white">
          Performanse portfolija
        </h2>
        <div className="flex flex-wrap gap-2">
          {[
            { label: 'Nedelja', value: 'week' },
            { label: 'Mesec', value: 'month' },
            { label: 'Godina', value: 'year' },
            { label: 'Sve', value: 'all' },
          ].map((range) => (
            <button
              key={range.value}
              onClick={() => setTimeRange(range.value)}
              className={`px-3 py-1 text-xs rounded-full transition-colors ${
                timeRange === range.value
                  ? 'bg-blue-500 dark:bg-blue-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              {range.label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 w-full flex bg-gray-50 dark:bg-gray-900 rounded-lg overflow-hidden min-h-[300px] sm:min-h-[400px] md:min-h-[500px] border border-gray-300 dark:border-gray-700">
        <div className="w-full p-4 min-h-[300px] max-w-full">{content}</div>
      </div>
    </div>
  );
}
