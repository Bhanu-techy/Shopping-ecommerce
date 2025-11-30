import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    rating : {type : Number},
    stock: { type: Number, required: true },
    image: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model("products", productSchema);
