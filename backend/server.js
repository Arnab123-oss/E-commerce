import app from "./app.js";
import dotenv from "dotenv";
import { connectDatabase } from "./config/database.js";

//Hanndling Uncought Exception

process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`shuting down the server due to Uncought Exception`);
  process.exit(1);
} )

// config
dotenv.config({ path: "backend/config/config.env" });

connectDatabase();

const srv = app.listen(process.env.PORT, () => {
  console.log(`Server is working on https://localhost:${process.env.PORT}`);
});

// Unhandled Promise Rejection

process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`shuting down the server due to Unhandled Promise Rejection`);

  srv.close(() => {
    process.exit(1);
  });
});
