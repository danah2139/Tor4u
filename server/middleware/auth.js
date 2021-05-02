const jwt = require("jsonwebtoken");
const Provider = require("../models/provider");

const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const decoded = jwt.verify(token, "thisismynewcourse");
    const provider = await Provider.findOne({
      _id: decoded._id,
      "tokens.token": token,
    });

    if (!provider) {
      throw new Error();
    }

    req.token = token;
    req.user = user;
    next();
  } catch (e) {
    res.status(401).send({ error: "Please authenticate." });
  }
};

module.exports = auth;
