import mongoose from "mongoose";
import CustomError from "./customError.js";

const connectMongo = () => {
  mongoose
    .connect(process.env.DB)
    .then(() => {
      console.log("db connected successfully.");
    })
    .catch((err) => {
      throw new CustomError(500, err.message);
    });
};

export default connectMongo;
