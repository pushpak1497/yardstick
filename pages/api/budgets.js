import connectDB from "@/lib/dbConnect";
import Budget from "@/models/Budget";

export default async function handler(req, res) {
  await connectDB();
  if (req.method === "GET") {
    const budgets = await Budget.find({});
    return res.status(200).json(budgets);
  }
  if (req.method === "POST") {
    try {
      const { category, amount } = req.body;
      if (!category || amount == null) {
        return res.status(400).json({ error: "Category and amount required" });
      }
      const month = new Date().toISOString().slice(0, 7); // e.g. "2025-04"
      const updated = await Budget.findOneAndUpdate(
        { category, month },
        { amount, category, month },
        { upsert: true, new: true }
      );
      return res.status(200).json(updated);
    } catch (error) {
      return res.status(500).json({ error: "Error setting budget" });
    }
  }
  res.setHeader("Allow", ["GET", "POST"]);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}
