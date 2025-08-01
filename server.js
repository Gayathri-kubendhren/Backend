const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const authUserRoutes = require('./routes/userauth');

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/userauth', authUserRoutes);
// ✅ Correct route path
const userAuthRoutes = require('./routes/userauth');
app.use('/api/userauth', userAuthRoutes);

// ✅ Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✨✅MongoDB Connected'))
.catch(err => console.error(' MongoDB connection error:', err));

// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
