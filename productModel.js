const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  price: { type: Number, required: true, min: 0 },
  stock_quantity: { type: Number, required: true, min: 0 },
  image: String,
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

productSchema.pre('save', function(next) {
  this.updated_at = Date.now();
  next();
});

productSchema.pre('findOneAndUpdate', function(next) {
  this._update.updated_at = Date.now();
  next();
});

module.exports = mongoose.model('Product', productSchema);
