const mongoose = require("mongoose");
const password = process.env.MONGO_PASSWORD;
console.log("your pass is: " + password);
mongoose.connect(
  `mongodb+srv://danah2139:${password}@tor4u.vhfn8.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,
  {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  }
);
