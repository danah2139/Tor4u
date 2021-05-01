const moongose = require("mongoose");
const ServiceBooked = moongose.connect("ServiceBooked", {});

module.exports = ServiceBooked;
