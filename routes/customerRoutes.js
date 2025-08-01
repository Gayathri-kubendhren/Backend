// ✅ backend/customer/Update.js
const express = require('express');
const router = express.Router();
const Customer = require('../models/customerModel');

// CREATE or UPDATE customer
router.post('/add', async (req, res) => {
  const { first_name, last_name, email, status } = req.body;
  try {
    let existing = await Customer.findOne({ email });
    if (existing) {
      existing.first_name = first_name;
      existing.last_name = last_name;
      existing.status = status || 'Active';
      await existing.save();
      return res.status(200).json({ message: 'Customer updated' });
    } else {
      await Customer.create({ first_name, last_name, email, status });
      return res.status(201).json({ message: 'Customer added' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Error saving customer' });
  }
});

// GET all customers
router.get('/', async (req, res) => {
  const customers = await Customer.find();
  res.json(customers);
});

// GET one customer
router.get('/:id', async (req, res) => {
  const customer = await Customer.findById(req.params.id);
  res.json(customer);
});

module.exports = router;
