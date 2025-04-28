import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function MonthlyBarChart({ transactions }) {
  const dataMap = {};
  transactions.forEach((tx) => {
    const month = new Date(tx.date).toLocaleString("default", {
      month: "short",
    });
    dataMap[month] = (dataMap[month] || 0) + tx.amount;
  });
  const data = Object.entries(dataMap).map(([month, total]) => ({
    month,
    total,
  }));

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h3 className="text-lg font-medium text-gray-700 mb-2">
        Monthly Expenses
      </h3>
      <div className="w-full h-64">
        <ResponsiveContainer>
          <BarChart data={data}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="total" name="Expenses" className="fill-blue-500" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
