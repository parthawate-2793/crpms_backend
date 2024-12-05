const express = require('express');
const { createDocument, getDocuments, getDocumentById, updateDocument, deleteDocument,downloadPDF } = require('../controllers/documentController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.route('/')
  .post(protect, createDocument)
  .get(protect, getDocuments);

router.route('/:id')
  .get(protect, getDocumentById)
  .put(protect, updateDocument)
  .delete(protect, deleteDocument);

router.route('/:id/download')
  .get(protect,downloadPDF);

module.exports = router;
