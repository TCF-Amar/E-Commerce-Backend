import mongoose from "mongoose";

const { Schema } = mongoose; // Correcting the 'Schema' declaration

const cartSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  products: [
    {
      product: {
        type: Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      size: {
        type: String,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
    },
  ],
});

const cartModel = mongoose.models.Cart || mongoose.model("Cart", cartSchema); // Updated the model checking to be more consistent.

export default cartModel;
