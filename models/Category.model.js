const { Schema, model } = require("mongoose");

// Product model Below
const categorySchema = new Schema(
  {
    id:{
      type: Number
    },
    categoryName: {
      type: String,
      unique: true,
      required: true
    },
    categoryDescription: {
      type: String,
    },
    categoryPhoto: {
      type: String
    },
    productGroup: [{
      type : Array
    }]
    
},
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const Category = model("Category", categorySchema);

module.exports = Category;