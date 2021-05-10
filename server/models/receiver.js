const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const ServiceBooked = require("./serviceBooked");

const receiverSchema = new mongoose.Schema({
  name: { type: String, trim: true },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw Error("email not valid!");
      }
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 7,
    trim: true,
    validate(value) {
      if (value.toLowerCase().includes("password")) {
        throw new Error('Password cannot contain "password"');
      }
    },
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
  avatar: {
    type: Buffer,
    // to display the img in the html use:
    // <img src="data:image/<insert file type: jpg/png,peng>;base64,<insert the value of the buffer>"
  },
  // service_booked: {},
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
});
receiverSchema.virtual("servicesBooked", {
  ref: "ServiceBooked",
  localField: "_id",
  foreignField: "receiver",
});

receiverSchema.methods.toJSON = function () {
  const receiver = this;
  const receiverObject = receiver.toObject();

  delete receiverObject.password;
  delete receiverObject.tokens;
  delete receiverObject.avatar;

  return receiverObject;
};

receiverSchema.methods.generateAuthToken = async function () {
  const receiver = this;
  const token = jwt.sign(
    { _id: receiver._id.toString() },
    process.env.JWT_SECRET
  );

  receiver.tokens = receiver.tokens.concat({ token });
  await receiver.save();

  return token;
};

receiverSchema.statics.findByCredentials = async (email, password) => {
  const receiver = await Receiver.findOne({ email });

  if (!receiver) {
    throw new Error("Unable to login");
  }

  const isMatch = await bcrypt.compare(password, receiver.password);

  if (!isMatch) {
    throw new Error("Unable to login");
  }

  return receiver;
};

// Hash the plain text password before saving
receiverSchema.pre("save", async function (next) {
  const receiver = this;

  if (receiver.isModified("password")) {
    receiver.password = await bcrypt.hash(receiver.password, 8);
  }

  next();
});

// Delete receiver tasks when receiver is removed
receiverSchema.pre("remove", async function (next) {
  const receiver = this;
  await ServiceBooked.deleteMany({ receiver: receiver._id });
  next();
});

const Receiver = mongoose.model("Receiver", receiverSchema);

module.exports = Receiver;
