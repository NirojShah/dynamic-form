import mongoose from "mongoose";

const connectMongo = () => {
  mongoose.connect();
};

export default connectMongo;