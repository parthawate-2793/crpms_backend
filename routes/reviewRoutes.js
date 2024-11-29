const express = require('express');
const { addReview, getReviews, updateReviewStatus } = require('../controllers/reviewController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.route('/')
  .post(protect, addReview)
  .get(protect, getReviews);

router.route('/:id')
  .put(protect, updateReviewStatus);

module.exports = router;
