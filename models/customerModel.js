const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
  first_name: String,
  last_name: String,
  email: { type: String, unique: true },
  status: { type: String, default: 'Active' },
});

module.exports = mongoose.model('Customer', customerSchema);
