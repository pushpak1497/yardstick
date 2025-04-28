export default function handler(req, res) {
  const categories = [
    "Food",
    "Transport",
    "Rent",
    "Shopping",
    "Utilities",
    "Entertainment",
  ];
  res.status(200).json(categories);
}
