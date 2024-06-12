import dotenv from "dotenv";
import express from "express";
import connectDB from "./config/db.js";
import productRoutes from "./routes/productRoutes.js";
dotenv.config();
const port = process.env.PORT || 4000;

connectDB(); // Connect to MongoDB
const app = express();

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.use("/api/products", productRoutes);

app.listen(port, (req, res) => console.log(`Server running on ${port}`));
