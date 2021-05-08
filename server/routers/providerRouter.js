const express = require("express");
const Provider = require("../models/provider");
const auth = require("../middleware/auth");
const router = new express.Router();

router.post("/providers/signup", async (req, res) => {
  const provider = new Provider(req.body);
  //console.log(req.body);

  try {
    await provider.save();
    const token = await provider.generateAuthToken();
    res.status(201).send({ provider, token });
  } catch (e) {
    res.status(400).send(e);
  }
});

router.post("/providers/login", async (req, res) => {
  try {
    const provider = await Provider.findByCredentials(
      req.body.email,
      req.body.password
    );
    //console.log("hi", provider);
    const token = await provider.generateAuthToken();
    res.send({ provider, token });
  } catch (e) {
    res.status(400).send(e.message);
  }
});

router.post("/providers/logout", auth, async (req, res) => {
  try {
    req.provider.tokens = req.provider.tokens.filter((token) => {
      return token.token !== req.token;
    });
    await req.provider.save();

    res.send("logged out");
  } catch (e) {
    res.status(500).send();
  }
});

// router.post("/providers/logoutAll", auth, async (req, res) => {
//   try {
//     req.provider.tokens = [];
//     await req.Provider.save();
//     res.send();
//   } catch (e) {
//     res.status(500).send();
//   }
// });

router.get("/providers", auth, async (req, res) => {
  try {
    const providers = await Provider.find({});
    res.status(200).send(providers);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get("/providers/me", auth, async (req, res) => {
  //console.log(req);
  res.send(req.provider);
});

router.patch("/providers/me", auth, async (req, res) => {
  const updates = Object.keys(req.body);
  console.log("test");
  const allowedUpdates = [
    "companyName",
    "email",
    "password",
    "category",
    "price",
  ];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid updates!" });
  }

  try {
    updates.forEach((update) => {
      // if (update === "categories") {
      //   let categoryIndex = req.provider.categories.findIndex(
      //     (category) => category.name === req.body.categories.name
      //   );
      //   if (categoryIndex !== -1) {
      //     req.provider.categories[categoryIndex].price =
      //       req.body.categories.price;
      //   } else {
      //     console.log("category", req.body.categories);
      //     req.provider.categories.push(req.body.categories);
      //   }
      // } else {
      req.provider[update] = req.body[update];
    });
    await req.provider.save();
    res.send(req.provider);
  } catch (e) {
    res.status(400).send(e);
  }
});

// router.put("/providers/me/categories", auth, async (req, res) => {
//   try {
//     const {}= req.param
//     const result = await Account.findByIdAndUpdate(id, {
//      $push: {

//   }, {
//       new: true,
//       runValidators: true
//   });
//     res.send(req.provider);
//   } catch (e) {
//     res.status(400).send(e);
//   }
// });

router.delete("/providers/me", auth, async (req, res) => {
  try {
    await req.provider.remove();
    res.send(req.Provider);
  } catch (e) {
    res.status(500).send();
  }
});

module.exports = router;
