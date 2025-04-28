// services/transactionService.js
export async function getTransactions() {
  const res = await fetch("/api/transactions");
  return await res.json();
}

export async function addTransaction(tx) {
  const res = await fetch("/api/transactions", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(tx),
  });
  return res.json();
}

export async function updateTransaction(id, tx) {
  const res = await fetch(`/api/transactions/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(tx),
  });
  return res.json();
}

export async function deleteTransaction(id) {
  await fetch(`/api/transactions/${id}`, {
    method: "DELETE",
  });
}
