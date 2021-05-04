const mongoose = require("mongoose");
const ServiceBooked = mongoose.model("ServiceBooked", {
  catagory: {
    type: String,
    required: true,
    trim: true,
  },
  price: {
    type: Number,
  },
  date: {
    type: Date,
    required: true,
  },
  provider: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Provider",
  },
  receiver: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Receiver",
  },
});

module.exports = ServiceBooked;
