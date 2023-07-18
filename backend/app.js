import express from "express";
import { errorMiddleware } from "./middleware/error.js";

const app = express();

app.use(express.json())

//Routes import
import product from "./routes/productRoute.js";
import user from "./routes/userRoute.js"

app.use("/api/v1", product);
app.use("/api/v1", user);

//middleware for error

app.use(errorMiddleware)


export default app;
