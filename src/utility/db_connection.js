import mongoose from "mongoose";

const connectMongo = () => {
  mongoose.connect(process.env.DB).then(()=>{
    console.log("db connected successfully.")
  })
  .catch(err=>{
    console.log(err.message)
  })
};

export default connectMongo;