const Version = require('../models/Version');

const addVersion = async (req, res) => {
  const { documentId, changes } = req.body;

  const version = await Version.create({
    documentId,
    changes,
    editedBy: req.user.id,
  });

  res.status(201).json(version);
};

const getVersions = async (req, res) => {
  const versions = await Version.find({ documentId: req.query.documentId }).populate('editedBy');
  res.json(versions);
};

module.exports = {
  addVersion,
  getVersions,
};
