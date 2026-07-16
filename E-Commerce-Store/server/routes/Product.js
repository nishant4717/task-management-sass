const express = require("express");
const router = express.Router();

const Product = require("../models/product");

// Add Product
router.post("/add", async (req, res) => {
  try {
    const product = new Product(req.body);

    await product.save();

    res.json({
      success: true,
      message: "Product Added Successfully",
      product: product
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message
    });
  }
});

// Get All Products
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();

    res.json(products);

  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message
    });
  }
});

// Get Product by ID
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found"
      });
    }

    res.json(product);

  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message
    });
  }
});


// Update Product
router.put("/update/:id", async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json({
      success: true,
      message: "Product Updated Successfully",
      product,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
});
// Delete Product
router.delete("/delete/:id", async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product Not Found"
      });
    }

    res.json({
      success: true,
      message: "Product Deleted Successfully"
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message
    });
  }
});

module.exports = router;