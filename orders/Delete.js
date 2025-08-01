// backend/orders/Delete.js
const express = require('express');
const router = express.Router();
const Order = require('../models/OrderModel'); // ensure the path is correct

// DELETE order by ID
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Order.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.json({ message: 'Order deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting order', error });
  }
});

module.exports = router;
