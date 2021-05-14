const express = require("express");
const Provider = require("../models/provider");
const auth = require("../middleware/auth");
const upload = require("../middleware/upload");
const sharp = require("sharp");
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

// upload or update a profile pic
router.post(
  "/providers/me/avatar",
  auth,
  upload.single("avatar"),
  async (req, res) => {
    const buffer = await sharp(req.file.buffer)
      .resize({ width: 250, height: 250 })
      .png()
      .toBuffer();

    req.provider.avatar = buffer;
    await req.user.save();
    res.send("uploaded!");
  },
  (error, req, res, next) => {
    res.status(400).send({ error: error.message });
  }
);

// router.post("/providers/logoutAll", auth, async (req, res) => {
//   try {
//     req.provider.tokens = [];
//     await req.Provider.save();
//     res.send();
//   } catch (e) {
//     res.status(500).send();
//   }
// });

router.get("/providers", async (req, res) => {
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

router.get("/providers/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    let provider = await Provider.findById(_id);
    console.log("provider", provider);
    res.send(provider);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.patch(
  "/providers/me",
  auth,
  upload.single("avatar"),
  async (req, res) => {
    const updates = Object.keys(req.body);
    console.log("updates", updates);
    const allowedUpdates = [
      "companyName",
      "email",
      "password",
      "phone",
      "address",
      "category",
      "price",
      "availableTimes",
      "avatar",
    ];
    const isValidOperation = updates.every((update) =>
      allowedUpdates.includes(update)
    );
    console.log(isValidOperation);

    if (!isValidOperation) {
      return res.status(400).send({ error: "Invalid updates!" });
    }

    try {
      const buffer = await sharp(req.file.buffer)
        .resize({ width: 400, height: 400 })
        .png()
        .toBuffer();
      updates.forEach((update) => {
        if (req.file && update === "avatar") {
          req.provider.avatar = buffer;
        } else if (update !== "avatar") {
          req.provider[update] = req.body[update];
        }
      });
      await req.provider.save();
      console.log("test", req.provider);
      res.send(req.provider);
    } catch (e) {
      res.status(400).send(e);
    }
  }
);

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
