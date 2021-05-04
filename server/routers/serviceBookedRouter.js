const express = require("express");
const ServiceBooked = require("../models/serviceBooked");
const auth = require("../middleware/auth");
const router = new express.Router();

// create a new serviceBooked
router.post("/servicesBooked", auth, async (req, res) => {
  const serviceBooked = new ServiceBooked({
    ...req.body,
    receiver: req.receiver._id,
  });
  console.log(serviceBooked);

  try {
    await serviceBooked.save();
    return res.status(201).send(serviceBooked);
  } catch (e) {
    res.status(400).send(e);
  }
});

// only for dev
// get a list of all serviceBookeds
router.get("/servicesBooked", async (req, res) => {
  try {
    const servicesBooked = await ServiceBooked.find({});

    return res.status(200).send(servicesBooked);
  } catch (e) {
    res.status(400).send(e);
  }
});

// get a list of all user serviceBookeds
router.get("/servicesBooked/me", auth, async (req, res) => {
  try {
    const user = req.user;
    // for filtering
    const match = {};
    const sort = {};
    // GET /servicesBooked/me?active=true
    if (req.query.active) {
      match.active = req.query.active === "true";
    }
    // GET /servicesBooked/me?limit=10&skip=2&sortBy=createdAt:desc
    if (req.query.sortBy) {
      const parts = req.query.sortBy.split(":");
      sort[parts[0]] = parts[1] === "desc" ? -1 : 1;
    }
    const options = {
      limit: parseInt(req.query.limit),
      skip: parseInt(req.query.skip),
      sort: sort,
    };

    await reciever
      .populate({
        path: "servicesBooked",
        match: match,
        options: options,
      })
      .execPopulate();
    return res.status(200).send(reciever.servicesBooked);
  } catch (e) {
    res.status(400).send(e);
  }
});

// get a serviceBooked by id
router.get("/servicesBooked/me/:id", auth, async (req, res) => {
  const _id = req.params.id;
  try {
    const serviceBooked = await ServiceBooked.findOne({
      _id,
      reciever: req.reciever._id,
    });
    if (!serviceBooked) {
      return res.status(404).send();
    }

    res.send(serviceBooked);
  } catch (e) {
    res.status(500).send();
  }
});

// update a serviceBooked by id
router.patch("/servicesBooked/me/:id", auth, async (req, res) => {
  const _id = req.params.id;
  const updates = Object.keys(req.body);
  const allowedUpdates = ["category", "price", "receiver"];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid updates!" });
  }

  try {
    const serviceBooked = await ServiceBooked.findOne({
      _id,
      owner: req.user._id,
    });

    updates.forEach((update) => (serviceBooked[update] = req.body[update]));
    await serviceBooked.save();

    if (!serviceBooked) {
      return res.status(404).send();
    }

    res.send(serviceBooked);
  } catch (e) {
    res.status(400).send(e);
  }
});

// delete a serviceBooked by id
router.delete("/servicesBooked/me/:id", auth, async (req, res) => {
  const _id = req.params.id;
  try {
    const serviceBooked = await ServiceBooked.findOneAndRemove({
      _id,
      reciever: req.reciever._id,
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
