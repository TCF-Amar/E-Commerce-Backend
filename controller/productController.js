import { v2 as cloudinary } from "cloudinary";

import productModel from "../models/productModel.js";

// function for add products
const addProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      quantity,
      category,
      subcategory,
      sizes,
      bestseller,
    } = req.body;

    // Validate required fields
    if (!name || !description || !price || !quantity || !category) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    if (isNaN(price) || isNaN(quantity)) {
      return res.status(400).json({
        success: false,
        message: "Price and Quantity must be numbers",
      });
    }

    // Process images
    const img1 = req.files?.img1?.[0];
    const img2 = req.files?.img2?.[0];
    const img3 = req.files?.img3?.[0];
    const img4 = req.files?.img4?.[0];

    const images = [img1, img2, img3, img4].filter((item) => item);

    const imgUrl = await Promise.all(
      images.map(async (item) => {
        const result = await cloudinary.uploader.upload(item.path, {
          resource_type: "image",
        });
        return result.secure_url;
      })
    );

    // Create product data
    const productData = {
      name,
      description,
      price: Number(price),
      quantity: Number(quantity),
      category,
      subcategory,
      sizes: sizes ? JSON.parse(sizes) : [],
      bestseller: bestseller === "true",
      images: imgUrl,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    console.log(productData);
    // Save product to database
    const product = new productModel(productData);
    await product.save();

    res
      .status(201)
      .json({ success: true, message: "Product added successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// function for list products
const listProducts = async (req, res) => {
  try {
    const products = await productModel.find({});
    res.json({ success: true, products });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// function for update product

// const updateProduct = async (req, res) => {};

// function for delete product

const deleteProduct = async (req, res) => {
  try {
    const { productId } = req.body;

    // Find the product by ID
    const product = await productModel.findById(productId);
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    // Remove the product
    await productModel.findByIdAndDelete(productId);

    res
      .status(200)
      .json({ success: true, message: "Product removed successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// function for single product info

const singleProduct = async (req, res) => {
  try {
    const { productId } = req.body; // Fixed destructuring

    // Find the product by ID
    const product = await productModel.findById(productId);
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    res.json({ success: true, product });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export {
  addProduct,
  //   updateProduct,
  deleteProduct,
  singleProduct,
  listProducts,
};
