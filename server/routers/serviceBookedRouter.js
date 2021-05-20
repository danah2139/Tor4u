const express = require("express");
const ServiceBooked = require("../models/serviceBooked");
const auth = require("../middleware/auth");
const router = new express.Router();
const { sendAppointmentMail } = require("../emails/appointment");

// create a new serviceBooked
router.post("/servicesBooked", auth, async (req, res) => {
  const serviceBooked = new ServiceBooked({
    ...req.body,
    receiver: req.receiver._id,
  });
  console.log("serviceBooked", serviceBooked);

  try {
    await serviceBooked.save();
    return res.status(201).send(serviceBooked);
  } catch (e) {
    res.status(400).send(e);
  }
});

// send email for reminder
router.post("/servicesBooked/email", auth, async (req, res) => {
  const appoontmantDetial = req.body;

  try {
    await sendAppointmentMail(appoontmantDetial);
    return res.status(201).send("email send");
  } catch (e) {
    res.status(400).send(e);
  }
});

router.get("/receivers/servicesBooked", auth, async (req, res) => {
  try {
    await req.receiver.populate("servicesBooked").execPopulate();
    res.send(req.receiver.servicesBooked);
  } catch (e) {
    res.status(500).send();
  }
});

router.get("/providers/servicesBooked", auth, async (req, res) => {
  try {
    await req.provider.populate("servicesBooked").execPopulate();
    res.send(req.provider.servicesBooked);
  } catch (e) {
    res.status(500).send();
  }
});

router.get("/servicesBooked/provider/:id", auth, async (req, res) => {
  try {
    console.log("id", req.params.id);
    const servicesBooked = await ServiceBooked.find({
      provider: req.params.id,
    });

    if (!servicesBooked) {
      return res.status(404).send();
    }

    res.send(servicesBooked);
  } catch (e) {
    res.status(500).send(e.message);
  }
});

router.get("/servicesBooked/:id", auth, async (req, res) => {
  const _id = req.params.id;

  try {
    const serviceBooked = await ServiceBooked.findOne({
      _id,
      receiver: req.receiver._id,
    });

    if (!serviceBooked) {
      return res.status(404).send();
    }

    res.send(serviceBooked);
  } catch (e) {
    res.status(500).send();
  }
});

router.patch("/servicesBooked/:id", auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["provider", "catagory", "date", "price"];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid updates!" });
  }

  try {
    const serviceBooked = await ServiceBooked.findOne({
      _id: req.params.id,
      receiver: req.receiver._id,
    });

    if (!serviceBooked) {
      return res.status(404).send();
    }

    updates.forEach((update) => (serviceBooked[update] = req.body[update]));
    await serviceBooked.save();
    res.send(serviceBooked);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.delete("/servicesBooked/:id", auth, async (req, res) => {
  try {
    const serviceBooked = await ServiceBooked.findOneAndDelete({
      _id: req.params.id,
      receiver: req.receiver._id,
    });

    if (!serviceBooked) {
      res.status(404).send();
    }

    res.send(serviceBooked);
  } catch (e) {
    res.status(500).send();
  }
});

module.exports = router;
