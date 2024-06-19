import mongoose from "mongoose";
import { config } from "./config";

const connectDB = async () => {
  try {
    mongoose.connect(config.dbUrl as string);
    mongoose.connection.on("connected", () => {
      console.log("connected successfully with database");
    });
    mongoose.connection.on("error", () => {
      console.log("Error with database connection");
    });
  } catch (error) {
    console.log("failed to connect database :", error);
    process.exit(1);
  }
};

export default connectDB;
