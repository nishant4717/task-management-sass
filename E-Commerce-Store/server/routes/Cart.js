const express = require("express");
const router = express.Router();

const Cart = require("../models/Cart");

// =====================
// Add To Cart
// =====================
router.post("/add", async (req, res) => {

    try {

        const { productId, quantity } = req.body;

        let cartItem = await Cart.findOne({ productId });

        if (cartItem) {

            cartItem.quantity += quantity || 1;

            await cartItem.save();

            return res.json({
                success: true,
                message: "Cart Updated",
                cartItem
            });

        }

        cartItem = new Cart({

            productId,
            quantity: quantity || 1

        });

        await cartItem.save();

        res.json({

            success: true,
            message: "Product Added",
            cartItem

        });

    }

    catch (err) {

        res.status(500).json({

            success: false,
            error: err.message

        });

    }

});

// =====================
// Get Cart
// =====================
router.get("/", async (req, res) => {

    try {

        const cart = await Cart.find().populate("productId");

        res.json(cart);

    }

    catch (err) {

        res.status(500).json({

            success: false,
            error: err.message

        });

    }

});

// =====================
// Increase Quantity
// =====================
router.put("/increase/:id", async (req, res) => {

    try {

        const item = await Cart.findById(req.params.id);

        item.quantity++;

        await item.save();

        res.json(item);

    }

    catch (err) {

        res.status(500).json({

            success: false,
            error: err.message

        });

    }

});

// =====================
// Decrease Quantity
// =====================
router.put("/decrease/:id", async (req, res) => {

    try {

        const item = await Cart.findById(req.params.id);

        if (item.quantity > 1) {

            item.quantity--;

            await item.save();

        }

        res.json(item);

    }

    catch (err) {

        res.status(500).json({

            success: false,
            error: err.message

        });

    }

});

// =====================
// Delete Item
// =====================
router.delete("/:id", async (req, res) => {

    try {

        await Cart.findByIdAndDelete(req.params.id);

        res.json({

            success: true,
            message: "Item Removed"

        });

    }

    catch (err) {

        res.status(500).json({

            success: false,
            error: err.message

        });

    }

});

module.exports = router;