import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import globalErrorHandler from "../utility/globalErrorHandler.js";
import applicationRouter from "./application.route.js";
import fileUpload from "express-fileupload";

const app = express();
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://192.168.220.1:5173",
      "http://192.168.11.1:5173/",
    ],
    credentials: true,
  }),
);
app.use(cookieParser());
app.use(express.json());
app.use(fileUpload());

app.use("/app/v1", applicationRouter);

app.use(globalErrorHandler);
export default app;
