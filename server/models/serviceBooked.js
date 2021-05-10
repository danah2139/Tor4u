const mongoose = require("mongoose");
const ServiceBooked = mongoose.model("ServiceBooked", {
  category: {
    type: String,
    required: true,
    trim: true,
  },
  price: {
    type: Number,
  },
  start: {
    type: Date,
    required: true,
  },
  end: {
    type: Date,
    required: true,
  },
  provider: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Provider",
  },
  providerDetails: {
    phone: String,
    address: String,
    companyName: String,
  },
  receiverDetails: {
    phone: String,
    address: String,
    name: String,
  },
  receiver: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Receiver",
  },
});

module.exports = ServiceBooked;
