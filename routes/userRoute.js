import express from "express";

import {
  loginUser,
  registerUser,
  adminLogin,
  user,
} from "../controller/userController.js"; // Add .js for ES modules
import authenticateUser from "../middleware/authenticateUser.js";

// Initialize Router
const userRoute = express.Router();

// User Registration
userRoute.post("/register", registerUser);
userRoute.get("/details", authenticateUser, user);
// User Login
userRoute.post("/login", loginUser);

// Admin Login
userRoute.post("/admin/login", adminLogin);

export default userRoute;
