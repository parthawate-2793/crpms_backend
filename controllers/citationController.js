const Citation = require('../models/Citation');
const Document = require('../models/Document');

const addCitation = async (req, res) => {
  const { source, details, documentId } = req.body;

  const citation = await Citation.create({ source, details, linkedDocument: documentId });

  const document = await Document.findById(documentId);
  if (document) {
    document.citations.push(citation.id);
    await document.save();
  }

  res.status(201).json(citation);
};

const getCitations = async (req, res) => {
  const citations = await Citation.find().populate('linkedDocument');
  res.json(citations);
};

const deleteCitation = async (req, res) => {
  const citation = await Citation.findById(req.params.id);

  if (citation) {
    await citation.remove();
    res.json({ message: 'Citation removed' });
  } else {
    res.status(404).json({ message: 'Citation not found' });
  }
};

module.exports = {
  addCitation,
  getCitations,
  deleteCitation,
};
