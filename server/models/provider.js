const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const ServiceBooked = require("./serviceBooked");

const providerSchema = new mongoose.Schema({
  companyName: {
    type: String,
    required: true,
    trim: true,
  },
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
});

providerSchema.virtual("booksServices", {
  ref: "ServiceBooked",
  localField: "_id",
  foreignField: "provider",
});

providerSchema.methods.toJSON = function () {
  const provider = this;
  const providerObject = provider.toObject();

  delete providerObject.password;
  delete providerObject.tokens;

  return providerObject;
};

providerSchema.methods.generateAuthToken = async function () {
  const provider = this;
  const token = jwt.sign(
    { _id: provider._id.toString() },
    process.env.JWT_SECRET
  );

  provider.tokens = provider.tokens.concat({ token });
  await provider.save();

  return token;
};

providerSchema.statics.findByCredentials = async (email, password) => {
  const provider = await provider.findOne({ email });

  if (!provider) {
    throw new Error("Unable to login");
  }

  const isMatch = await bcrypt.compare(password, provider.password);

  if (!isMatch) {
    throw new Error("Unable to login");
  }

  return provider;
};

// Hash the plain text password before saving
providerSchema.pre("save", async function (next) {
  const provider = this;

  if (provider.isModified("password")) {
    provider.password = await bcrypt.hash(provider.password, 8);
  }

  next();
});

// Delete provider tasks when provider is removed
providerSchema.pre("remove", async function (next) {
  const provider = this;
  await ServiceBooked.deleteMany({ owner: provider._id });
  next();
});

const Provider = mongoose.model("Provider", providerSchema);
module.exports = Provider;
