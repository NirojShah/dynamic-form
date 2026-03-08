import express from "express"
import globalErrorHandler from "../utility/globalErrorHandler.js";
import applicationRouter from "./application.route.js";

const app = express();

app.use(applicationRouter)


app.use(globalErrorHandler);
export default app;