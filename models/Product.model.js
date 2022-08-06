const { Schema, model } = require("mongoose");

// Product model Below
const productSchema = new Schema(
  {
    id:{
      type: Number
    },
    productName: {
      type: String,
      unique: true,
      required: true
    },
    productDescription: {
      type: String,
    },
    productCost: {
        type: Number,
      },
    productPrice: {
      exVat: {
        type: Number,
        required: true
      },
      vat: {
        type: Number,
        required: true // we need to adapt VAT with user location
      },
      discount: {
        type: Number, // % de la valeur TTC donc exVat * vat
      }
    },
    materials: [{
      type: String
    }],
    productSize: {
      length: {
        type: Number,
      },
      width: {
        type: Number,
      },
      height: {
        type: Number,
      },
      thickness: {
        type: Number,
      },
      surface: {
        type: Number,
      },
      weight: {
        type: Number,
      }
    },
    packagingSize: {
      length: {
        type: Number,
        required: true
      },
      width: {
        type: Number,
        required: true
      },
      height: {
        type: Number,
        required: true
      },
      weight: {
          type: Number,
          required: true
        },
    },
    color: {
      type: String
    },
    brand: {
      type: String
    },
    mainPhoto: {
      type: String, // url
      required: true
    },
    otherPhotos: [{
      type: String
    }], // urls
    stock: {
      type: Number // has to be edited after each order
    },
    notice: {
      type: String
    },
    category: [{
      type: String
    }]
},

  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const Product = model("Product", productSchema);

module.exports = Product;