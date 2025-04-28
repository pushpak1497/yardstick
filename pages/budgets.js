import { useEffect, useState } from "react";
import { getBudgets } from "@/services/budgetService";
import { getTransactions } from "@/services/transactionService";
import BudgetForm from "@/components/BudgetForm";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

export default function BudgetsPage() {
  const [budgets, setBudgets] = useState([]);
  const [transactions, setTransactions] = useState([]);

  const loadBudgets = async () => {
    const data = await getBudgets();
    setBudgets(data);
  };
  const loadTransactions = async () => {
    const data = await getTransactions();
    setTransactions(data);
  };

  useEffect(() => {
    loadBudgets();
    loadTransactions();
  }, []);

  const month = new Date().toISOString().slice(0, 7);
  const spentByCategory = {};
  transactions
    .filter((tx) => tx.date.slice(0, 7) === month)
    .forEach((tx) => {
      spentByCategory[tx.category] =
        (spentByCategory[tx.category] || 0) + tx.amount;
    });

  const chartData = budgets
    .filter((b) => b.month === month)
    .map((b) => ({
      category: b.category,
      Budget: b.amount,
      Spent: spentByCategory[b.category] || 0,
    }));

  return (
    <div className="container mx-auto p-6 space-y-8">
      <h1 className="text-3xl font-bold text-gray-800">Budgets for {month}</h1>
      <BudgetForm onBudgetSet={loadBudgets} />

      <div className="bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">
          Budget vs Spent
        </h2>
        <div className="w-full h-64">
          <ResponsiveContainer>
            <BarChart data={chartData}>
              <XAxis dataKey="category" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="Budget" fill="#82ca9d" />
              <Bar dataKey="Spent" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="space-y-2">
        {chartData.map((item) => {
          const percent =
            item.Budget > 0 ? ((item.Spent / item.Budget) * 100).toFixed(0) : 0;
          return (
            <p key={item.category} className="text-gray-700">
              <span className="font-medium">{item.category}:</span> {percent}%
              of budget used ({item.Spent}/{item.Budget})
            </p>
          );
        })}
      </div>
    </div>
  );
}
