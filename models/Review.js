const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
  documentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Document', required: true },
  reviewer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  comments: { type: String, required: true },
  status: { type: String, enum: ['approved', 'rejected', 'needs_revision'], default: 'needs_revision' },
}, { timestamps: true });

module.exports = mongoose.model('Review', ReviewSchema);
