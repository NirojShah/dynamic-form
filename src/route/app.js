import express from "express";
import globalErrorHandler from "../utility/globalErrorHandler.js";
import applicationRouter from "./application.route.js";

const app = express();

app.use(express.json());
app.use("/app/v1",applicationRouter);


app.use(globalErrorHandler);
export default app;