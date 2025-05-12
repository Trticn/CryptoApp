import { useState, useMemo } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { useGetPortfolioSnapshotsQuery } from '../../store'

export default function PortfolioChartSection() {
  const { data: snapshots = [], isFetching } = useGetPortfolioSnapshotsQuery();
  const [timeRange, setTimeRange] = useState("month");

  const chartData = useMemo(() => {
    if (!snapshots || snapshots.length === 0) return [];
  
    // First filter by date range
    const filteredData = snapshots.filter((snapshot) => {
      const snapshotDate = new Date(snapshot.date);
      const now = new Date();
      const cutoffDate = new Date(now);
  
      switch (timeRange) {
        case "week":
          cutoffDate.setDate(now.getDate() - 7);
          break;
        case "month":
          cutoffDate.setMonth(now.getMonth() - 1);
          break;
        case "year":
          cutoffDate.setFullYear(now.getFullYear() - 1);
          break;
        case "all":
          return true;
        default:
          return true;
      }
  
      return snapshotDate >= cutoffDate;
    });
  
    // Then group by time period
    const groupedData = {};
    filteredData.forEach((snapshot) => {
      const date = new Date(snapshot.date);
      let key;
      
      if (timeRange === "week" || timeRange === "month") {
        // Group by day for week/month view
        key = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
      } else if (timeRange === "year") {
        // Group by month for year view
        key = `${date.getFullYear()}-${date.getMonth()}`;
      } else {
        // Group by year for "all" view
        key = date.getFullYear();
      }
  
      if (!groupedData[key]) {
        groupedData[key] = {
          date: snapshot.date, // Keep the original date for display
          value: 0,
          invested: 0,
          profit: 0,
          change: 0,
          count: 0
        };
      }
  
      groupedData[key].value += snapshot.totalValue;
      groupedData[key].invested += snapshot.totalInvested;
      groupedData[key].profit += snapshot.totalProfit;
      groupedData[key].change += snapshot.change24hPercent;
      groupedData[key].count++;
    });
  
    // Convert to array and calculate averages
    const result = Object.values(groupedData).map(item => ({
      date: item.date,
      value: item.value / item.count,
      invested: item.invested / item.count,
      profit: item.profit / item.count,
      change: item.change / item.count
    }));
  
    // Sort by date
    result.sort((a, b) => new Date(a.date) - new Date(b.date));
  
    return result;
  }, [snapshots, timeRange]);

  const lineColors = {
    value: "#6366f1",
    invested: "#f59e0b",
    profit: "#10b981",
    change: "#ef4444",
  };

  if (isFetching) {
    return (
      <div className="text-center py-8 text-gray-700 dark:text-gray-300">
        Učitavanje podataka...
      </div>
    );
  }

  if (!snapshots || snapshots.length === 0) {
    return (
      <div className="text-center py-8 text-gray-700 dark:text-gray-300">
        Nema dostupnih podataka o portfoliju.
      </div>
    );
  }

  return (
    <div className="flex-1 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-medium font-bold text-gray-800 dark:text-white">
          Performanse portfolija
        </h2>
        <div className="flex space-x-2">
          {[
            { label: "Nedelja", value: "week" },
            { label: "Mesec", value: "month" },
            { label: "Godina", value: "year" },
            { label: "Sve", value: "all" },
          ].map((range) => (
            <button
              key={range.value}
              onClick={() => setTimeRange(range.value)}
              className={`px-3 py-1 text-xs rounded-full transition-colors ${
                timeRange === range.value
                  ? "bg-blue-500 dark:bg-blue-600 text-white"
                  : "bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
              }`}
            >
              {range.label}
            </button>
          ))}
        </div>
      </div>

      <div className="h-96 w-full flex items-center justify-center bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700">
        <div className="w-full h-full max-w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={chartData}
              margin={{ top: 10, right: 30, left: 0, bottom: 10 }}
            >
              <CartesianGrid strokeDasharray="4 4" stroke="#e5e7eb" />
              <XAxis
  dataKey="date"
  tick={{ fontSize: 12, fill: "#6b7280" }}
  axisLine={false}
  tickLine={false}
  tickFormatter={(date) => {
    const d = new Date(date);
    if (timeRange === "week") {
      return `${d.getDate()}. ${d.toLocaleString("default", { month: "short" })}`;
    } else if (timeRange === "month") {
      return `${d.getDate()}.`;
    } else if (timeRange === "year") {
      return d.toLocaleString("default", { month: "short" });
    }
    return d.getFullYear().toString();
  }}
/>
              <YAxis
                tick={{ fontSize: 12, fill: "#6b7280" }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(value) => `$${value.toLocaleString()}`}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "white",
                  border: "1px solid #e5e7eb",
                  borderRadius: "8px",
                  fontSize: "13px",
                  padding: "10px",
                }}
                labelStyle={{ color: "#374151", fontWeight: 500 }}
                itemStyle={{ color: "#4b5563" }}
                formatter={(value,name) => {
             
                  return [
                    `${name}: $${value.toFixed(2)}`
                  ];
                }}
                labelFormatter={(date) => `Datum: ${date}`}
              />
              <Legend
                wrapperStyle={{
                  fontSize: "13px",
                  paddingTop: "10px",
                  color: "#6b7280",
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
        </div>
      </div>
    </div>
  );
}
