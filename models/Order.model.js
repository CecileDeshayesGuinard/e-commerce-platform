const { Schema, model } = require("mongoose");

// User model Below
const orderSchema = new Schema(
  {
    id:{
      type: Number
    },
    user_id: {
      type: Number,
      unique: true,
      required: true  
    },
    product_id: [{type: String, unique: true, required: true}],
},

  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const Order = model("Order", orderSchema);

module.exports = Order;