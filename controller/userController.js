import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js"; // Correct reference
import validator from "validator"; // For email validation

const createToken = (id) => {
  // Generate JWT token with expiration time of 1 day
  const token = jwt.sign({ id }, process.env.JWT_SECRET);
  return token;
};

// User Registration
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validate input
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    // Validate email format
    if (!validator.isEmail(email)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid email format" });
    }

    // Check if user already exists
    const userExists = await userModel.findOne({ email });
    if (userExists) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }
    //   Check password length and validate
    if (password.length < 8) {
      return res
        .status(400)
        .json({ success: false, message: "Please enter valid password" });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const newUser = await userModel.create({
      name,
      email,
      password: hashedPassword,
    });

    const user = await newUser.save();

    // Generate JWT token
    const token = createToken(user._id);

    res.json({
      success: true,
      msg: "User registered successfully",
      userId: user._id,
      token,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    // Find user by email
    const user = await userModel.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User doesn't exists" });
    }

    // Check if password matches
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });
    }

    // Generate JWT Token with expiry of 1 day (this can be modified)
    const token = createToken(user._id, "1d"); // You can customize expiry here

    res.status(200).json({
      success: true,
      msg: "Login successful",
      token,
    });
  } catch (error) {
    res.status(500).json({ error: "Server error", details: error.message });
  }
};

// Admin Login
const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if both email and password are providedx
    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    // Validate admin credentials from environment variables
    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      // Generate a JWT token for the admin
      const token = jwt.sign(email + password, process.env.JWT_SECRET);

      return res.json({
        success: true,
        token,
      });
    }

    // If credentials are invalid
    return res.json({ success: false, message: "Invalid Credentials" });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

export default adminLogin;

export { loginUser, registerUser, adminLogin };
