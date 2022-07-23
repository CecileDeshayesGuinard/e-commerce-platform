const { Schema, model } = require("mongoose");

// User model Below
const userSchema = new Schema(
  {
    id:{
      type: Number
    },
    firstName: {
      type: String,
      required : true
    },
    lastName: {
      type: String,
      required: true
    },
    phoneNumber: {
      type : Number,
    },
    email: {
      type : Number,
      unique: true,
      required: true
    },
    company: {
      companyName: {
        type: String,
        required: true
      },
      vatNumber: {
        type: String,
        required: true
      },
      apeCode: {
        type: String
      },
      registrationNumber: {
        type: String,
        required: true
      }
    }, 
    billingAdress: {
      streetName: {
        type: String,
        required: true
      },
      streetNumber: {
        type: Number,
        required: true
      },
      zipCode: {
        type: Number,
        required: true
      },
      cityName: {
        type: String,
        required: true
      },
      countryName: {
        type: String,
        required: true
      }
    },
    deliveryAdress: {
      streetName: {
        type: String,
        required: true
      },
      streetNumber: {
        type: Number,
        required: true
      },
      zipCode: {
        type: Number,
        required: true
      },
      cityName: {
        type: String,
        required: true
      },
      countryName: {
        type: String,
        required: true
      }
    },
    password: { // come back to password because bcrypt / hasch
      type : String,
      unique: true,
      required: true
    },
  }, 
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;