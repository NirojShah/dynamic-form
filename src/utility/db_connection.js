import mongoose from "mongoose";
import CustomError from "./customError.js";

const connectMongo = () => {
  mongoose
    .connect(process.env.DB)
    .then(() => {})
    .catch((err) => {
      throw new CustomError(500, err.message);
    });
};

export default connectMongo;
