const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// =========================
// Middleware
// =========================
app.use(cors());
app.use(express.json());

// =========================
// MongoDB Connection
// =========================
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB Connected");
  })
  .catch((err) => {
    console.log("❌ MongoDB Connection Error");
    console.log(err);
  });

// =========================
// Import Routes
// =========================
const productRoutes = require("./routes/Product");
const cartRoutes = require("./routes/Cart");
const authRoutes = require("./routes/auth");
const orderRoutes = require("./routes/Order");

// =========================
// Use Routes
// =========================
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/orders", orderRoutes);

// =========================
// Home Route
// =========================
app.get("/", (req, res) => {
  res.send("🚀 E-Commerce Backend Running...");
});

// =========================
// Invalid Route
// =========================
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route Not Found",
  });
});

// =========================
// Start Server
// =========================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});