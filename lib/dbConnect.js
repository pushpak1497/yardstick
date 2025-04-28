import mongoose from "mongoose";

let isConnected = false;

export default async function connectDB() {
  if (isConnected) return;
  if (!process.env.MONGODB_URI) {
    throw new Error("MONGODB_URI not set in environment");
  }
  await mongoose.connect(process.env.MONGODB_URI);
  isConnected = true;
}
