// backend/models/OrderModel.js
const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  productId: Number,
  productName: String,
  productImage: String,
  qty: Number,
  price: Number,
  name: String,
  address: String,
  post: String,
  pincode: String,
  district: String,
  phone: String,
  payment: String,
  date: String,
  status: {
    type: String,
    default: 'Pending'
  }
});

module.exports = mongoose.model('Order', orderSchema);
