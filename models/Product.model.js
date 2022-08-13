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
      type: Array
    }],
    productSize: {
      productSize_length: {
        type: Number,
      },
      productSize_width: {
        type: Number,
      },
      productSize_height: {
        type: Number,
      },
      productSize_thickness: {
        type: Number,
      },
      productSize_surface: {
        type: Number,
      },
      productSize_weight: {
        type: Number,
      }
    },
    packagingSize: {
      packagingSize_length: {
        type: Number,
        required: true
      },
      packagingSize_width: {
        type: Number,
        required: true
      },
      packagingSize_height: {
        type: Number,
        required: true
      },
      packagingSize_weight: {
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
    },
    otherPhotos: [{
      type: Array
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