import mongoose from "mongoose";
import { DB_URI , NODE_ENV} from "../config/env.js";

if(!DB_URI) {
  throw new Error("Database URI is not defined in environment variables");
}

const connectDB = async () => {
  try {
    await mongoose.connect(DB_URI);
    console.log(`MongoDB connected successfully in ${NODE_ENV} mode`);
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1); // Exit process with failure
  }
};

export default connectDB;