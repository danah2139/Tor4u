require("dotenv").config();
require("./db/mongoose");
const express = require("express");
const cors = require("cors");
const path = require("path");
const receiverRouter = require("./routers/receiverRouter");
const providerRouter = require("./routers/providerRouter");
const serviceBookedRouter = require("./routers/serviceBookedRouter");

const app = express();
app.use(cors());
app.use(express.json());
// API calls
app.use("/api", receiverRouter);
app.use("/api", providerRouter);
app.use("/api", serviceBookedRouter);

if (process.env.NODE_ENV === "production") {
  // Serve any static files
  app.use(express.static(path.join(__dirname, "client/build")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
