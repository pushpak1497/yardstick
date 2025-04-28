import { useState, useEffect } from "react";
import {
  deleteTransaction,
  updateTransaction,
} from "@/services/transactionService";
import { Button } from "@/components/ui/button";
import { getCategories } from "@/services/categoryService";

export default function TransactionList({ transactions, onUpdateList }) {
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({ amount: "", description: "" });
  const [categories, setCategories] = useState([]);

  const handleDelete = async (id) => {
    await deleteTransaction(id);
    onUpdateList();
  };
  useEffect(() => {
    async function fetchCategories() {
      try {
        const cats = await getCategories();
        setCategories(cats);
      } catch (err) {
        console.error("Failed to load categories", err);
      }
    }
    fetchCategories();
  }, []);

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
    const updatedTransaction = await updateTransaction(id, {
      ...editForm,
      amount: parseFloat(editForm.amount),
    });
    setEditingId(null);
    onUpdateList(updatedTransaction);
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
          {transactions.map((tx) =>
            editingId === tx._id ? (
              <tr key={tx._id} className="bg-gray-100">
                <td className="px-4 py-2">
                  <input
                    type="text"
                    name="description"
                    value={editForm.description}
                    onChange={handleEditChange}
                    className="w-full border border-gray-300 rounded-md px-2 py-1"
                  />
                </td>
                <td className="px-4 py-2">
                  <input
                    type="number"
                    name="amount"
                    value={editForm.amount}
                    onChange={handleEditChange}
                    className="w-full border border-gray-300 rounded-md px-2 py-1"
                  />
                </td>
                <td className="px-4 py-2">
                  <input
                    type="date"
                    name="date"
                    value={editForm.date}
                    onChange={handleEditChange}
                    className="w-full border border-gray-300 rounded-md px-2 py-1"
                  />
                </td>
                <td className="px-4 py-2">
                  <select
                    name="category"
                    value={editForm.category}
                    onChange={handleEditChange}
                    className="w-full border border-gray-300 rounded-md px-2 py-1"
                  >
                    <option value="">Select</option>
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </td>
                <td className="px-4 py-2 flex justify-center space-x-2">
                  <Button
                    size="sm"
                    className="bg-green-500 hover:bg-green-600 text-white"
                    onClick={() => submitEdit(tx._id)}
                  >
                    Save
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setEditingId(null)}
                  >
                    Cancel
                  </Button>
                </td>
              </tr>
            ) : (
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
                <td className="px-4 py-2 text-sm text-gray-800">
                  {tx.category}
                </td>
                <td className="px-4 py-2 text-center space-x-2">
                  <Button
                    size="sm"
                    className="bg-blue-400 text-white hover:bg-blue-700"
                    onClick={() => startEdit(tx)}
                  >
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => handleDelete(tx._id)}
                    className="bg-red-400 hover:bg-red-600 text-white"
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
}
