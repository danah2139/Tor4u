const mongoose = require("mongoose");
const validator = require("validator");

const Provider = mongoose.model(Provider, {
  name: { type: String },
  companyName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw Error("email not valid!");
      }
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
      validate(value) {
        if (!validator.isMobilePhone(value, ["he-IL"])) {
          throw new Error("phone number most be a valid isrealy phone number");
        }
      },
    },
    categories: [{ name: String, price: Number }],
    rank: { type: Number },
    availableTimes: [{ from: Date, to: Date }],
    address: { type: String },
    city: { type: String },
    region: { type: String },
    tokens: [
      {
        token: {
          type: String,
          required: true,
        },
      },
    ],
    //serviceBooked: [ ],
  },
});
