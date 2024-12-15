import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    images: {
      type: [String], // Array of image URLs
      required: true,
    },
    category: {
      type: String, // Corrected type
      required: true,
    },
    subcategory: {
      type: [String], // Array of subcategories
      required: true,
    },
    sizes: {
      type: [String], // Array of sizes (e.g., ["S", "M", "L"])
      required: true,
    },
    bestseller: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true, // Automatically adds `createdAt` and `updatedAt`
  }
);

const productModel =
  mongoose.models.product || mongoose.model("product", productSchema);

export default productModel;
