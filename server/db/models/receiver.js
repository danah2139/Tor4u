const mongoose = require("mongoose");
const validator = require("validator");

const Reciever = mongoose.model("Reciever", {
  name: { type: String },
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
    address: { type: String },
    city: { type: String },
    region: { type: String },
    // service_booked: {},
  },
});

module.exports = Reciever;
