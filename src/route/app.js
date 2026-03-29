import express from "express"
import globalErrorHandler from "../utility/globalErrorHandler.js";

const app = express();



app.use(globalErrorHandler);
export default app;