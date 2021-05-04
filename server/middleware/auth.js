const jwt = require("jsonwebtoken");
const Provider = require("../models/provider");
const Receiver = require("../models/receiver");

const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const provider = await Provider.findOne({
      _id: decoded._id,
      "tokens.token": token,
    });
    const receiver = await Receiver.findOne({
      _id: decoded._id,
      "tokens.token": token,
    });

    console.log("rec", decoded, receiver);

    if (provider) {
      req.provider = provider;
    } else if (receiver) {
      req.receiver = receiver;
    } else {
      throw new Error("invalid token");
    }
    req.token = token;
    next();
  } catch (e) {
    res.status(401).send(e.message);
    // { error: "Please authenticate." }
  }
};

module.exports = auth;
