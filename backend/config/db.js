import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const uri = process.env.MONGO_URI;

const connectDB = async () => {
  try {
    console.log("MONGO_URI:", uri);

    await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }); 

    console.log("MongoDB Connected Successfully");
  } catch (error) {
    console.error("MongoDB Error:", error.message);
    process.exit(1);
  }
};

export default connectDB;
