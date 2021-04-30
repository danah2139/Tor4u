require("dotenv").config();
require("./src/db/mongoose");
const express = require("express");
const cors = require("cors");
const path = require("path");
const app = express();

const userRouter = require("./src/routers/user");
const publicDirectory = path.join(__dirname, "client/build");
app.use(express.static(publicDirectory));
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
