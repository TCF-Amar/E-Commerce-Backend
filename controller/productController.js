import { v2 as cloudinary } from "cloudinary";
import productModel from "../models/productModel.js";

// Function to add a product
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

    // Validate numeric fields
    if (isNaN(price) || isNaN(quantity)) {
      return res.status(400).json({
        success: false,
        message: "Price and Quantity must be numbers",
      });
    }

    // Handle image uploads
    const image1 = req.files?.image1?.[0];
    const image2 = req.files?.image2?.[0];
    const image3 = req.files?.image3?.[0];
    const image4 = req.files?.image4?.[0];
    const images = [image1, image2, image3, image4].filter((item) => item);

    // Upload images to Cloudinary
    const imgUrl = await Promise.all(
      images.map(async (item) => {
        const result = await cloudinary.uploader.upload(item.path, {
          resource_type: "image",
        });
        return result.secure_url;
      })
    );

    // Prepare product data for saving
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

    // Save product to the database
    const product = new productModel(productData);
    await product.save();

    res
      .status(201)
      .json({ success: true, message: "Product added successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Function to list all products
const listProducts = async (req, res) => {
  try {
    const products = await productModel.find({});
    res.json({ success: true, products });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Function to delete a product
const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if the product exists
    const product = await productModel.findById(id);
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    // Delete the product
    await productModel.findByIdAndDelete(id);
    res
      .status(200)
      .json({ success: true, message: "Product removed successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Function to get details of a single product
const singleProduct = async (req, res) => {
  try {
    const { productId } = req.body;

    // Find product by ID
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

export { addProduct, deleteProduct, singleProduct, listProducts };
