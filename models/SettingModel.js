// backend/models/SettingModel.js
const mongoose = require('mongoose');

const settingSchema = new mongoose.Schema({
  logoUrl: String,
  primaryColor: String,
  secondaryColor: String,
  fontFamily: String,
  customHTML: String,
});

module.exports = mongoose.model('Setting', settingSchema);
