import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import globalErrorHandler from "../utility/globalErrorHandler.js";
import applicationRouter from "./application.route.js";

const app = express();
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));
app.use(cookieParser());
app.use(express.json());
app.use("/app/v1", applicationRouter);

app.use(globalErrorHandler);
export default app;
