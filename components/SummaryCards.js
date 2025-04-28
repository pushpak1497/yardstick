export default function SummaryCards({ transactions }) {
  const total = transactions.reduce((sum, tx) => sum + tx.amount, 0);
  const catMap = {};
  transactions.forEach((tx) => {
    catMap[tx.category] = (catMap[tx.category] || 0) + tx.amount;
  });
  const topCategory = Object.keys(catMap).reduce(
    (a, b) => (catMap[a] > catMap[b] ? a : b),
    ""
  );
  const topAmount = catMap[topCategory] || 0;
  const sorted = [...transactions].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );
  const latest = sorted[0];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <div className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition">
        <h4 className="text-sm font-medium text-gray-500">Total Expenses</h4>
        <p className="mt-2 text-2xl font-bold text-gray-800">
          {total.toFixed(2)}
        </p>
      </div>
      <div className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition">
        <h4 className="text-sm font-medium text-gray-500">Top Category</h4>
        <p className="mt-2 text-xl font-semibold text-gray-800">
          {topCategory} ({topAmount.toFixed(2)})
        </p>
      </div>
      <div className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition col-span-1 sm:col-span-2 lg:col-span-2">
        <h4 className="text-sm font-medium text-gray-500">Most Recent</h4>
        {latest ? (
          <p className="mt-2 text-lg text-gray-800">
            {latest.description} – {latest.amount.toFixed(2)}
          </p>
        ) : (
          <p className="mt-2 text-gray-600">No transactions yet</p>
        )}
      </div>
    </div>
  );
}
