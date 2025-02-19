"use server";
import { connect, connection } from "mongoose";

class DatabaseConnection {
  static #instance = null;

  constructor() {
  }

  static getInstance() {
    if (!DatabaseConnection.#instance) {
      DatabaseConnection.#instance = new DatabaseConnection();
    }
    return DatabaseConnection.#instance;
  }

  async connect() {
    try {
      if (connection.readyState === 1) {
        console.log("Using existing MongoDB connection");
        return;
      }

      await connect(process.env.MONGODB_URI);
      console.log("Connected to MongoDB");

      // Handle connection errors
      connection.on("error", (error) => {
        console.error("MongoDB connection error:", error);
      });

      connection.on("disconnected", () => {
        console.log("MongoDB disconnected");
      });

      process.on("SIGINT", async () => {
        await connection.close();
        console.log("MongoDB connection closed through app termination");
        process.exit(0);
      });
    } catch (err) {
      console.error("MongoDB connection error:", err);
      throw err;
    }
  }
}

export const connectToDb = async () => {
  const dbConnection = DatabaseConnection.getInstance();
  await dbConnection.connect();
};
