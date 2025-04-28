import { useEffect, useState } from "react";
import { getTransactions } from "@/services/transactionService";
import TransactionForm from "@/components/TransactionForm";
import TransactionList from "@/components/TransactionList";

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState([]);

  const loadTransactions = async () => {
    const data = await getTransactions();
    setTransactions(data);
  };

  useEffect(() => {
    loadTransactions();
  }, []);

  const handleAdd = (newTx) => {
    setTransactions((prev) => [newTx, ...prev]);
  };

  return (
    <div className="container mx-auto p-6 space-y-8">
      <h1 className="text-3xl font-bold text-gray-800">Transactions</h1>
      <TransactionForm onAdd={handleAdd} />
      <TransactionList
        transactions={transactions}
        onUpdateList={loadTransactions}
      />
    </div>
  );
}
