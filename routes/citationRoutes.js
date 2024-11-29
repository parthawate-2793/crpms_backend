const express = require('express');
const { addCitation, getCitations, deleteCitation } = require('../controllers/citationController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.route('/')
  .post(protect, addCitation)
  .get(protect, getCitations);

router.route('/:id')
  .delete(protect, deleteCitation);

module.exports = router;
