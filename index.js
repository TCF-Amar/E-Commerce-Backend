import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./configs/mongodb.js";
import connectCloudinary from "./configs/cloudinary.js";
import userRoute from "./routes/userRoute.js";
import productRouter from "./routes/productRoute.js";

// App Config
const app = express();
const port = process.env.PORT || 8000;

// Connect to Database and Cloudinary
connectDB();
connectCloudinary();

// Middlewares
app.use(express.json());
app.use(cors());

// API Endpoints
app.use("/api/user", userRoute);
app.use("/api/product", productRouter);

app.get("/", (req, res) => {
  res.send("Hello from Express server!");
});

// Start Server
app.listen(port, () => {
  console.log("Express server listening on port " + port);
  console.log(`Server running at http://localhost:${port}`);
});
