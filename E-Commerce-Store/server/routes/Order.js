const express = require("express");
const router = express.Router();

const Order = require("../models/Order");
const Cart = require("../models/Cart");

// ===========================
// Place Order
// ===========================
router.post("/place", async (req, res) => {

    try {

        const {
            name,
            phone,
            address,
            city,
            pincode,
            products,
            totalAmount
        } = req.body;

        const order = new Order({

            name,
            phone,
            address,
            city,
            pincode,
            products,
            totalAmount

        });

        await order.save();

        // Clear Cart after successful order
        await Cart.deleteMany({});

        res.status(201).json({

            success: true,
            message: "Order Placed Successfully",
            order

        });

    } catch (err) {

        res.status(500).json({

            success: false,
            error: err.message

        });

    }

});

// ===========================
// Get All Orders
// ===========================
router.get("/", async (req, res) => {

    try {

        const orders = await Order.find()
            .populate("products.productId")
            .sort({ createdAt: -1 });

        res.json(orders);

    } catch (err) {

        res.status(500).json({

            success: false,
            error: err.message

        });

    }

});

// ===========================
// Get Single Order
// ===========================
router.get("/:id", async (req, res) => {

    try {

        const order = await Order.findById(req.params.id)
            .populate("products.productId");

        if (!order) {

            return res.status(404).json({

                success: false,
                message: "Order Not Found"

            });

        }

        res.json(order);

    } catch (err) {

        res.status(500).json({

            success: false,
            error: err.message

        });

    }

});

// ===========================
// Delete Order (Optional)
// ===========================
router.delete("/:id", async (req, res) => {

    try {

        await Order.findByIdAndDelete(req.params.id);

        res.json({

            success: true,
            message: "Order Deleted Successfully"

        });

    } catch (err) {

        res.status(500).json({

            success: false,
            error: err.message

        });

    }

});

module.exports = router;