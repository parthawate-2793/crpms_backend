const express = require('express');
const { addVersion, getVersions } = require('../controllers/versionController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.route('/')
  .post(protect, addVersion)
  .get(protect, getVersions);

module.exports = router;
