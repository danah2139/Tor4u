const express = require("express");
const Receiver = require("../models/receiver");
const auth = require("../middleware/auth");
const router = new express.Router();

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

// router.post("/receivers/logoutAll", auth, async (req, res) => {
//   try {
//     req.receiver.tokens = [];
//     await req.receiver.save();
//     res.send();
//   } catch (e) {
//     res.status(500).send();
//   }
// });

router.get("/receivers", auth, async (req, res) => {
  try {
    const receivers = await Receiver.find({});
    res.status(200).send(receivers);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get("/receivers/me", auth, async (req, res) => {
  res.send(req.receiver);
});

router.patch("/receivers/me", auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["name", "email", "password", "address", "phone"];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid updates!" });
  }

  try {
    updates.forEach((update) => (req.receiver[update] = req.body[update]));
    await req.receiver.save();
    res.send(req.receiver);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.delete("/receivers/me", auth, async (req, res) => {
  try {
    await req.receiver.remove();
    res.send(req.receiver);
  } catch (e) {
    res.status(500).send();
  }
});

module.exports = router;
