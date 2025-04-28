import { useState } from "react";
import {
  deleteTransaction,
  updateTransaction,
} from "@/services/transactionService";
import { Button } from "@/components/ui/button";

export default function TransactionList({ transactions, onUpdateList }) {
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({ amount: "", description: "" });

  const handleDelete = async (id) => {
    await deleteTransaction(id);
    onUpdateList();
  };

  const startEdit = (tx) => {
    setEditingId(tx._id);
    setEditForm({
      amount: tx.amount,
      description: tx.description,
      category: tx.category,
      date: tx.date.slice(0, 10),
    });
  };

  const handleEditChange = (e) => {
    setEditForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const submitEdit = async (id) => {
    await updateTransaction(id, {
      ...editForm,
      amount: parseFloat(editForm.amount),
    });
    setEditingId(null);
    onUpdateList();
  };

  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow-md">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
              Description
            </th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
              Amount
            </th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
              Date
            </th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
              Category
            </th>
            <th className="px-4 py-2 text-center text-sm font-medium text-gray-700">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {transactions.map((tx) => (
            <tr key={tx._id} className="hover:bg-gray-50">
              <td className="px-4 py-2 text-sm text-gray-800">
                {tx.description}
              </td>
              <td className="px-4 py-2 text-sm text-gray-800">
                {tx.amount.toFixed(2)}
              </td>
              <td className="px-4 py-2 text-sm text-gray-800">
                {new Date(tx.date).toLocaleDateString()}
              </td>
              <td className="px-4 py-2 text-sm text-gray-800">{tx.category}</td>
              <td className="px-4 py-2 text-center space-x-2">
                <Button
                  size="sm"
                  variant="outline"
                  className="px-3 py-1 text-sm hover:bg-gray-100"
                  onClick={() => startEdit(tx)}
                >
                  Edit
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  className="px-3 py-1 text-sm hover:bg-red-600 text-white bg-red-400"
                  onClick={() => handleDelete(tx._id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
