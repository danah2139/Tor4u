const mongoose = require("mongoose");
const userName = process.env.MONGO_USER_NAME;
const password = process.env.MONGO_PASSWORD;
mongoose.connect(
  `mongodb+srv://${userName}:${password}@tor4u.vhfn8.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,
  {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  }
);
