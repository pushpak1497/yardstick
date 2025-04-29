import { useEffect, useState } from "react";
import { getTransactions } from "@/services/transactionService";
import SummaryCards from "@/components/SummaryCards";
import MonthlyBarChart from "@/components/BarChart";
import CategoryPieChart from "@/components/PieChart";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Loader2 } from "lucide-react";

export default function DashboardPage() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const data = await getTransactions();
      setTransactions(data);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
        <Loader2 className="h-16 w-16 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 space-y-8">
      <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
        <div className="mt-4 sm:mt-0 space-x-4">
          <Link href="/transactions">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              Manage Transactions
            </Button>
          </Link>
          <Link href="/budgets">
            <Button className="bg-green-600 hover:bg-green-700 text-white">
              Manage Budgets
            </Button>
          </Link>
        </div>
      </header>

      <SummaryCards transactions={transactions} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <MonthlyBarChart transactions={transactions} />
        <CategoryPieChart transactions={transactions} />
      </div>
    </div>
  );
}
