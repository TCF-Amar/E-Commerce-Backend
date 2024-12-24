import express from "express";
import {
  addToCart,
  removeFromCart,
  getCartByUser,
} from "../controller/cartController.js";

const cartRouter = express.Router();

// POST: Add product to cart
cartRouter.post("/addToCart", addToCart);

// DELETE: Remove product from cart
cartRouter.delete("/removeFromCart", removeFromCart);

// GET: Get all cart items by user
cartRouter.get("/getCartByUser", getCartByUser);

export default cartRouter;
