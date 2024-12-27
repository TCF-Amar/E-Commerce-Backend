import express from "express";
import { addToCart, removeFromCart } from "../controller/cartController.js";

const cartRouter = express.Router();

// POST: Add product to cart
cartRouter.post("/addToCart", addToCart);

// DELETE: Remove product from cart
cartRouter.delete("/removeFromCart", removeFromCart);

export default cartRouter;
