const express = require("express");
const router = express.Router();
const Order = require("../models/Order");

router.post("/add", async (req, res) => {
  const { items } = req.body;
  try {
    const newOrder = new Order({ items });
    await newOrder.save();
    res.status(201).json({ message: "Order saved", order: newOrder });
  } catch (err) {
    res.status(500).json({ error: "Error saving order" });
  }
});

module.exports = router;
