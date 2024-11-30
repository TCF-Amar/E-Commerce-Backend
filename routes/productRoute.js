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
    { name: "img1", maxCount: 1 },
    { name: "img2", maxCount: 1 },
    { name: "img3", maxCount: 1 },
    { name: "img4", maxCount: 1 },
  ]),
  addProduct
);
productRouter.post("/list", listProducts);
// productRouter.post("/update", updateProduct);
productRouter.post("/single", singleProduct);
productRouter.delete("/delete", adminAuth, deleteProduct);

export default productRouter;
