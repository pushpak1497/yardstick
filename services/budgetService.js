export async function getBudgets() {
  const res = await fetch("/api/budgets");
  return await res.json();
}

export async function setBudget(category, amount) {
  const res = await fetch("/api/budgets", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ category, amount }),
  });
  return res.json();
}
