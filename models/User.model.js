const { Schema, model } = require("mongoose");

// User model Below
const userSchema = new Schema(
  {
    id: {
      type: String
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
      type: String,
    },
    email: {
      type: String,
      unique: true,
      required: true
    },
    dateOfBirth: {
      type: String
    },
    company: {
      companyName: {
        type: String,
      },
      vatNumber: {
        type: String,
      },
      nafCode: {
        type: String
      },
      regNumber: {
        type: String,
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