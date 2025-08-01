const express = require('express');
const multer = require('multer');
const Product = require('./productModel');
const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});
const upload = multer({ storage });

// Create
router.post('/api/products', upload.single('image'), async (req, res) => {
  try {
    const { name, description, price, stock_quantity } = req.body;
    if (!name || price <= 0 || stock_quantity < 0)
      return res.status(400).json({ message: 'Invalid input' });

    const newProduct = new Product({
      name,
      description,
      price,
      stock_quantity,
      image: req.file?.filename || ''
    });

    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Read with pagination/filter/sort
router.get('/api/products', async (req, res) => {
  try {
    const { page = 1, limit = 20, sortBy = 'name', order = 'asc', search = '' } = req.query;
    const query = { name: { $regex: search, $options: 'i' } };

    const total = await Product.countDocuments(query);
    const products = await Product.find(query)
      .sort({ [sortBy]: order === 'asc' ? 1 : -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    res.json({ total, page: Number(page), products });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update
router.put('/api/products/:id', upload.single('image'), async (req, res) => {
  try {
    const { name, description, price, stock_quantity } = req.body;
    if (!name || price <= 0 || stock_quantity < 0)
      return res.status(400).json({ message: 'Invalid input' });

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        name,
        description,
        price,
        stock_quantity,
        ...(req.file && { image: req.file.filename })
      },
      { new: true }
    );

    if (!updatedProduct) return res.status(404).json({ message: 'Product not found' });

    res.json(updatedProduct);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete
router.delete('/api/products/:id', async (req, res) => {
  try {
    // Simulate check if product is part of any order
    const productInOrder = false;
    if (productInOrder) return res.status(400).json({ message: 'Cannot delete: Product in orders' });

    const deleted = await Product.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Product not found' });

    res.json({ message: 'Product deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
