// models/Budget.js
import mongoose from "mongoose";

const BudgetSchema = new mongoose.Schema({
  category: { type: String, required: true },
  amount: { type: Number, required: true },
  month: { type: String, required: true }, // Format: YYYY-MM
  createdAt: { type: Date, default: Date.now },
});

BudgetSchema.index({ category: 1, month: 1 }, { unique: true });

export default mongoose.models.Budget || mongoose.model("Budget", BudgetSchema);
