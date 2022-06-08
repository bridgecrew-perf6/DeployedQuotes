import mongoose from "mongoose";
// import { MONGO_URL } from "../Configuration/config.js";

const connectDb = async () => {
  try {
    const result = mongoose.connect(process.env.MONOG_URL);
    if (result) {
      console.log("database is connected successfully");
    }
  } catch (err) {
    console.log("Db Connection is failed");
  }
};

export default connectDb;
