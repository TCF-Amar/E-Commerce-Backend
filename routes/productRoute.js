import express from "express";
import adminAuth from "../middleware/adminAuth.js";
import {
  addProduct,
  listProducts,
  // updateProduct,
  singleProduct,
  deleteProduct,
} from "../controller/productController.js";
import upload from "../middleware/multer.js";

const productRouter = express.Router();

// Add a new product

productRouter.post(
  "/add",
  adminAuth,
  upload.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 },
    { name: "image4", maxCount: 1 },
  ]),
  addProduct
);
productRouter.get("/list", listProducts);
// productRouter.post("/update", updateProduct);
productRouter.post("/single", singleProduct);
productRouter.delete("/delete/:id", adminAuth, deleteProduct);

export default productRouter;
