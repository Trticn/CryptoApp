import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid
} from 'recharts';

function LineChartComponent({ data }) {
  const lineColors = {
    income: '#22c55e',   // green-500
    expense: '#ef4444',  // red-500
    profit: '#6366f1'    // indigo-500
  };

  return (
    <div className="w-full h-[400px] bg-white rounded-2xl shadow-md p-6 border border-gray-100 transition-all duration-300 flex flex-col gap-6">
      {/* Naslov */}
      <h3 className="text-xl font-semibold text-gray-800 text-center">Financial Trend</h3>

      {/* Chart */}
      <div className="flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 10 }}>
            <CartesianGrid strokeDasharray="4 4" stroke="#e5e7eb" />
            <XAxis
              dataKey="date"
              tick={{ fontSize: 13, fill: '#6b7280' }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fontSize: 13, fill: '#6b7280' }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'white',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                fontSize: '14px',
                padding: '10px'
              }}
              labelStyle={{ color: '#374151', fontWeight: 500 }}
              itemStyle={{ color: '#4b5563' }}
            />
            <Legend
              wrapperStyle={{
                fontSize: '14px',
                paddingTop: '10px',
                color: '#6b7280'
              }}
            />
            <Line
              type="monotone"
              dataKey="income"
              stroke={lineColors.income}
              strokeWidth={3}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
              name="Income"
            />
            <Line
              type="monotone"
              dataKey="expense"
              stroke={lineColors.expense}
              strokeWidth={3}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
              name="Expense"
            />
            <Line
              type="monotone"
              dataKey="profit"
              stroke={lineColors.profit}
              strokeWidth={3}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
              name="Profit"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default LineChartComponent;
