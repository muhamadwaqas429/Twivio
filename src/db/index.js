import mongoose from "mongoose";
import { DB_Name } from "../constants.js";
import dotenv from "dotenv";
dotenv.config({
  path: "./.env",
});
const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URI}/${DB_Name}`
    );

    console.log(
      `MongoDB connected successfully: ${connectionInstance.connection.host}`
    );
  } catch (error) {
    console.log("MONGODB CONNECTION ERROR", error.message);
    process.exit(1);
  }
};

export default connectDB;
