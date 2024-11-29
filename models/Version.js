const mongoose = require('mongoose');

const VersionSchema = new mongoose.Schema({
    documentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Document', required: true},
    changes: {type: String, required: true},
    editedBy: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
}, {timestamps:true});

module.exports = mongoose.model('Version', VersionSchema);