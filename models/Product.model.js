const { Schema, model } = require("mongoose");

// User model Below
const productSchema = new Schema(
  {
    id:{
      type: Number
    },
    productName: {
      type: String,
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
        type: Number, // we need to adapt VAT with user location
      },
      discount: {
        type: Number, // % de la valeur TTC donc exVat * vat
      }
    },
    materials: [{type: String}],
    productSize: {
      sizingTypeLinear: {
        lenght: {
          type: Number,
        },
        width: {
          type: Number,
        },
        eight: {
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
      sizingTypeLetter: {
        sizeLetter: {
          type: Number,
        },
      },
      sizingTypeNumber: {
        sizeNumber: {
          type: Number,
        },
      },
    },
    packagingSize: {
      lenght: {
        type: Number,
        required: true
      },
      width: {
        type: Number,
        required: true
      },
      eight: {
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
    otherPhotos: [{type: String}], // urls
    stock: {
        type: Number // has to be edited after each order
      },
    category: {
      type: String
    },  
},

  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const Product = model("Product", productSchema);

module.exports = Product;