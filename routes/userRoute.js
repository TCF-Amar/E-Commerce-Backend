import express from "express";

import {
  loginUser,
  registerUser,
  adminLogin,
} from "../controller/userController.js"; // Add .js for ES modules

// Initialize Router
const userRoute = express.Router();

// User Registration
userRoute.post("/register", registerUser);

// User Login
userRoute.post("/login", loginUser);

// Admin Login
userRoute.post("/admin/login", adminLogin);

export default userRoute;
