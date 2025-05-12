import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config({ path: "./server/.env" });

const connectDB = async () => {
  console.log("MONGO_URI:", process.env.MONGO_URI); // Add this line to debug

  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");
  } catch (err) {
    console.error(" MongoDB connection failed:", err.message);
    process.exit(1); // stop server if MongoDB cannot be connected
  }
};

export default connectDB;
