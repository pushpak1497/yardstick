import connectDB from "@/lib/dbConnect";
import Transaction from "@/models/Transaction";

export default async function handler(req, res) {
  const { id } = req.query;
  await connectDB();

  if (req.method === "GET") {
    const tx = await Transaction.findById(id);
    if (!tx) return res.status(404).json({ error: "Not found" });
    return res.status(200).json(tx);
  }
  if (req.method === "PUT") {
    try {
      const { amount, date, description, category } = req.body;
      const updated = await Transaction.findByIdAndUpdate(
        id,
        { amount, date, description, category },
        { new: true }
      );
      if (!updated) return res.status(404).json({ error: "Not found" });
      return res.status(200).json(updated);
    } catch {
      return res.status(500).json({ error: "Error updating transaction" });
    }
  }
  if (req.method === "DELETE") {
    try {
      await Transaction.findByIdAndDelete(id);
      return res.status(204).end();
    } catch {
      return res.status(500).json({ error: "Error deleting transaction" });
    }
  }
  res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}
