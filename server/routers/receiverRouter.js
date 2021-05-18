const express = require("express");
const Receiver = require("../models/receiver");
const auth = require("../middleware/auth");
const upload = require("../middleware/upload");
const router = new express.Router();
const sharp = require("sharp");

router.post("/receivers/signup", async (req, res) => {
  const receiver = new Receiver(req.body);

  try {
    await receiver.save();
    const token = await receiver.generateAuthToken();
    res.status(201).send({ receiver, token });
  } catch (e) {
    res.status(400).send(e);
  }
});

router.post("/receivers/login", async (req, res) => {
  try {
    const receiver = await Receiver.findByCredentials(
      req.body.email,
      req.body.password
    );
    const token = await receiver.generateAuthToken();
    res.send({ receiver, token });
  } catch (e) {
    res.status(400).send();
  }
});

router.post("/receivers/logout", auth, async (req, res) => {
  try {
    req.receiver.tokens = req.receiver.tokens.filter((token) => {
      return token.token !== req.token;
    });
    await req.receiver.save();

    res.send("logged out");
  } catch (e) {
    res.status(500).send();
  }
});

// upload or update a profile pic
router.post(
  "/receivers/me/avatar",
  auth,
  upload.single("avatar"),
  async (req, res) => {
    const buffer = await sharp(req.file.buffer)
      .resize({ width: 250, height: 250 })
      .png()
      .toBuffer();

    req.receiver.avatar = buffer;
    await req.user.save();
    res.send("uploaded!");
  },
  (error, req, res, next) => {
    res.status(400).send({ error: error.message });
  }
);

// router.post("/receivers/logoutAll", auth, async (req, res) => {
//   try {
//     req.receiver.tokens = [];
//     await req.receiver.save();
//     res.send();
//   } catch (e) {
//     res.status(500).send();
//   }
// });

router.get("/receivers", async (req, res) => {
  try {
    const receivers = await Receiver.find({});
    res.status(200).send(receivers);
  } catch (error) {
    res.status(500).send(error);
  }
});

// router.get("/receivers/:id", async (req, res) => {
//   try {
//     const _id = req.params.id;
//     let receiver = Receiver.findById(_id);
//     res.send(receiver);
//   } catch (error) {
//     res.status(400).send(error);
//   }
// });

router.get("/receivers/me", auth, async (req, res) => {
  console.log(req.receiver);
  res.send(req.receiver);
});

router.patch(
  "/receivers/me",
  auth,
  upload.single("avatar"),
  async (req, res) => {
    console.log(req.file);
    //console.log(updates);
    const allowedUpdates = [
      "name",
      "email",
      "password",
      "address",
      "phone",
      "avatar",
    ];

    try {
      //console.log("update", updates);
      console.log(req.file, "file");
      if (req.file) {
        const buffer = await sharp(req.file.buffer)
          .resize({ width: 400, height: 400 })
          .png()
          .toBuffer();
        req.body.avatar = buffer;
        console.log("buffer", buffer);
      }
      const updates = Object.keys(req.body);
      const isValidOperation = updates.every((update) =>
        allowedUpdates.includes(update)
      );

      if (!isValidOperation) {
        return res.status(400).send({ error: "Invalid updates!" });
      }

      updates.forEach((update) => {
        //console.log(update, "update");
        req.receiver[update] = req.body[update];
      });

      await req.receiver.save();
      res.send(req.receiver);
    } catch (e) {
      res.status(400).send(e);
    }
  }
);

router.delete("/receivers/me", auth, async (req, res) => {
  try {
    await req.receiver.remove();
    res.send(req.receiver);
  } catch (e) {
    res.status(500).send();
  }
});

module.exports = router;
