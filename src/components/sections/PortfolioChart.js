// components/sections/PortfolioChartSection.jsx
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { useState } from "react";

const data = [
  { name: "Pon", value: 1000 },
  { name: "Uto", value: 1200 },
  { name: "Sre", value: 1100 },
  { name: "Čet", value: 1400 },
  { name: "Pet", value: 1300 },
  { name: "Sub", value: 1600 },
  { name: "Ned", value: 1700 },
];

export default function PortfolioChartSection() {
  const [activeRange, setActiveRange] = useState("1D");

  return (
    <div className="flex-1 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-medium font-bold text-gray-800 dark:text-white">
          Performanse portfolija
        </h2>
        <div className="flex space-x-2">
          {["1D", "1N", "1M", "1G"].map((range) => (
            <button
              key={range}
              onClick={() => setActiveRange(range)}
              className={`px-3 py-1 text-xs rounded-full transition-colors ${
                activeRange === range
                  ? "bg-blue-500 dark:bg-blue-600 text-white"
                  : "bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
              }`}
            >
              {range}
            </button>
          ))}
        </div>
      </div>
      <div className="h-64 w-full flex items-center justify-center bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700">
  <div className="w-full h-full max-w-full">
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
        <XAxis dataKey="name" stroke="#888" />
        <YAxis stroke="#888" />
        <Tooltip />
        <Line
          type="monotone"
          dataKey="value"
          stroke="#3b82f6"
          strokeWidth={2}
          dot={false}
        />
      </LineChart>
    </ResponsiveContainer>
  </div>
</div>


    </div>
  );
}
