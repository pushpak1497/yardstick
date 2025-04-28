import { useState } from "react";
import { setBudget } from "@/services/budgetService";
import CategorySelect from "./CategorySelect";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function BudgetForm({ onBudgetSet }) {
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!category || amount <= 0) {
      setMessage("Select category and positive amount");
      return;
    }
    await setBudget(category, parseFloat(amount));
    setMessage(`Budget set for ${category}`);
    onBudgetSet();
    setAmount("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-lg shadow-md space-y-4 max-w-lg mx-auto"
    >
      {message && <p className="text-green-600 text-sm">{message}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <CategorySelect
          name="budgetCategory"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full sm:col-span-2"
        />
        <Input
          type="number"
          placeholder="Budget Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
        />
        <Button
          type="submit"
          className="bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
        >
          Set Budget
        </Button>
      </div>
    </form>
  );
}
