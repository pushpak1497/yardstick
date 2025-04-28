import connectDB from "@/lib/dbConnect";
import Transaction from "@/models/Transaction";

export default async function handler(req, res) {
  await connectDB();
  if (req.method === "GET") {
    const transactions = await Transaction.find({}).sort({ date: -1 });
    return res.status(200).json(transactions);
  }
  if (req.method === "POST") {
    try {
      const { amount, date, description, category } = req.body;
      if (!amount || !date || !description || !category) {
        return res.status(400).json({ error: "Missing required fields" });
      }
      if (amount <= 0) {
        return res.status(400).json({ error: "Amount must be positive" });
      }
      const tx = new Transaction({ amount, date, description, category });
      await tx.save();
      return res.status(201).json(tx);
    } catch (error) {
      return res.status(500).json({ error: "Error creating transaction" });
    }
  }
  res.setHeader("Allow", ["GET", "POST"]);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}
