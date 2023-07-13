import app from "./app.js";
import dotenv from "dotenv";
import {connectDatabase} from "./config/database.js";

// config
dotenv.config({ path: "backend/config/config.env" });



connectDatabase();



app.listen(process.env.PORT, () => {
  console.log(`Server is working on https://localhost:${process.env.PORT}`);
});
