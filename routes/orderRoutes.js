// backend/routes/orderRoutes.js
const express = require('express');
const router = express.Router();
const Order = require('../models/OrderModel');

router.post('/api/orders', async (req, res) => {
  try {
    const newOrder = new Order(req.body);
    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (err) {
    res.status(500).json({ message: 'Failed to save order', error: err });
  }
});

router.get('/api/orders', async (req, res) => {
  try {
    const orders = await Order.find().sort({ date: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch orders', error: err });
  }
});
router.put('/api/orders/:id', async (req, res) => {
  const { status } = req.body;

  try {
    const updated = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update order', error: err });
  }
});


module.exports = router;
