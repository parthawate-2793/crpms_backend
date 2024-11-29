const Review = require('../models/Review');

const addReview = async (req, res) => {
  const { documentId, comments } = req.body;

  const review = await Review.create({
    documentId,
    reviewer: req.user.id,
    comments,
  });

  res.status(201).json(review);
};

const getReviews = async (req, res) => {
  const reviews = await Review.find({ documentId: req.query.documentId }).populate('reviewer');
  res.json(reviews);
};

const updateReviewStatus = async (req, res) => {
  const { status } = req.body;

  const review = await Review.findById(req.params.id);

  if (review) {
    review.status = status;
    await review.save();
    res.json(review);
  } else {
    res.status(404).json({ message: 'Review not found' });
  }
};

module.exports = {
  addReview,
  getReviews,
  updateReviewStatus,
};
