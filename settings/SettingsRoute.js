// backend/settings/SettingsRoute.js
const express = require('express');
const router = express.Router();
const multer = require('multer');
const Setting = require('../models/SettingModel');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, 'logo_' + Date.now() + '_' + file.originalname);
  }
});
const upload = multer({ storage: storage });

router.post('/api/settings', upload.single('logo'), async (req, res) => {
  try {
    const { primaryColor, secondaryColor, fontFamily, customHTML, existingLogo } = req.body;

    let logoUrl = existingLogo || null;
    if (req.file) {
      logoUrl = `/uploads/${req.file.filename}`;
    }

    let setting = await Setting.findOne();
    if (setting) {
      setting.primaryColor = primaryColor;
      setting.secondaryColor = secondaryColor;
      setting.fontFamily = fontFamily;
      setting.customHTML = customHTML;
      setting.logoUrl = logoUrl;
      await setting.save();
    } else {
      setting = new Setting({ primaryColor, secondaryColor, fontFamily, customHTML, logoUrl });
      await setting.save();
    }

    res.json({ message: 'Settings saved successfully', setting });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to save settings' });
  }
});

router.get('/api/settings', async (req, res) => {
  try {
    const setting = await Setting.findOne();
    res.json(setting);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch settings' });
  }
});

module.exports = router;
