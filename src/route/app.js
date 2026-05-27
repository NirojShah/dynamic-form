import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import globalErrorHandler from "../utility/globalErrorHandler.js";
import applicationRouter from "./application.route.js";
import fileUpload from "express-fileupload";
import { config_env } from "../../environment_setup.js";

config_env();

const origins = process.env.origin;

const app = express();
app.use(
  cors({
    origin: [...origins.split(",")],
    credentials: true,
  }),
);
app.use(cookieParser());
app.use(express.json());
app.use(fileUpload());

app.use("/app/v1", applicationRouter);

app.use(globalErrorHandler);
export default app;
