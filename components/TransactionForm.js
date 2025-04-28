import { useState } from "react";
import { addTransaction } from "@/services/transactionService";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import CategorySelect from "./CategorySelect";

export default function TransactionForm({ onAdd }) {
  const [form, setForm] = useState({
    amount: "",
    date: "",
    description: "",
    category: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { amount, date, description, category } = form;
    if (!amount || !date || !description || !category) {
      setError("All fields are required.");
      return;
    }
    if (parseFloat(amount) <= 0) {
      setError("Amount must be positive.");
      return;
    }
    try {
      const newTx = await addTransaction({
        amount: parseFloat(amount),
        date,
        description,
        category,
      });
      onAdd(newTx);
      setForm({ amount: "", date: "", description: "", category: "" });
      setError("");
    } catch {
      setError("Error adding transaction.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-lg shadow-md space-y-4 max-w-md mx-auto"
    >
      {error && <p className="text-red-600 text-sm">{error}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Amount
          </label>
          <Input
            type="number"
            name="amount"
            value={form.amount}
            onChange={handleChange}
            className="mt-1 w-full border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Date
          </label>
          <Input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            className="mt-1 w-full border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="sm:col-span-2">
          <label className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <Input
            type="text"
            name="description"
            value={form.description}
            onChange={handleChange}
            className="mt-1 w-full border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="sm:col-span-2">
          <label className="block text-sm font-medium text-gray-700">
            Category
          </label>
          <CategorySelect
            name="category"
            value={form.category}
            onChange={handleChange}
            className="mt-1 w-full border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      <Button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
      >
        Add Transaction
      </Button>
    </form>
  );
}
