import express from "express";
import { errorMiddleware } from "./middleware/error.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import bodyParser from "body-parser";
import fileUpload from "express-fileupload";

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true })); // insteed of this 
//code I have to check this code is run or not
// app.use(
//     express.urlencoded({
//         extended: true,
//       })
//     );
app.use(fileUpload());

//Routes import
import product from "./routes/productRoute.js";
import user from "./routes/userRoute.js";
import order from "./routes/orderRoute.js";

app.use("/api/v1", product);
app.use("/api/v1", user);
app.use("/api/v1", order);

//middleware for error

app.use(errorMiddleware);

export default app;

// {
//     origin:"http://127.0.0.1:3000", //process.env.FRONTEND_URL
//     Credentials:true,
//     method: ["GET","POST","PUT","DELETE"]
//   }
