const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const productRoutes = require('./product');
const customerRoutes = require('./routes/customerRoutes');
const orderRoutes = require('./routes/orderRoutes');
const deleteOrderRoute = require('./orders/Delete');
const settingsRoute = require('./settings/SettingsRoute');





const app = express();
const PORT = 4000;



mongoose.connect('mongodb://127.0.0.1:27017/hallexy', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

app.use(productRoutes);
app.use('/api/customers', customerRoutes);
app.use(orderRoutes);
app.use('/api/orders', deleteOrderRoute);
app.use(settingsRoute);


app.listen(PORT, () => {
  console.log(`✅✨Server running at http://localhost:${PORT}`);
});
