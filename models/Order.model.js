const { Schema, model } = require("mongoose");

// User model Below
const orderSchema = new Schema(
  {
    id:{
      type: Number
    },
    user_id: {
      type: String,
      unique: true,
      required: true  
    },
    product: [{
      product_id: {
        type: String,
        unique: true,
        required: true
      },
      quantity: {
        type: Number,
        required: true
      }
    }],
    amount: {
      exVat: {
        type: Number,
        required: true
      },
      vat: {
        type: Number,
        required: true
      },
      transportAmount: {
        exVat: {
          type: Number,
          required: true
        },
        vat: {
          type: Number,
          required: true
        }
      }
    },
    totalAmount: {
      currency: {
        type: String,
        required: true
      },
      value: {
        type: Number,
        required: true
      }
    },
    shipmentStatus: {
      type: String
    },
    creationDate: {
      type: String,
      required: true
    }
},

  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const Order = model("Order", orderSchema);

module.exports = Order;