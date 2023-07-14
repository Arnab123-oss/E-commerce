import express from "express";
import { errorMiddleware } from "./middleware/error.js";

const app = express();

app.use(express.json())

//Routes import
import product from "./routes/productRoute.js";

app.use("/api/v1", product);

//middleware for error

app.use(errorMiddleware)


export default app;
