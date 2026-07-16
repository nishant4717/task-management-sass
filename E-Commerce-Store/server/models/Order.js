const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({

  name: {
    type: String,
    required: true
  },

  phone: {
    type: String,
    required: true
  },

  address: {
    type: String,
    required: true
  },

  city: {
    type: String,
    required: true
  },

  pincode: {
    type: String,
    required: true
  },

  products: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
      },

      quantity: {
        type: Number,
        default: 1
      }
    }
  ],

  totalAmount: {
    type: Number,
    required: true
  },

  status: {
    type: String,
    default: "Pending"
  }

},
{
  timestamps: true
});

module.exports = mongoose.model("Order", OrderSchema);