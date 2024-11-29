const mongoose = require('mongoose');

const CitationSchema = new mongoose.Schema({
    source: {type: String, required: true},
    details: {type: String, required: true},
    linkedDocument: {type: mongoose.Schema.Types.ObjectId, ref: 'Document'},
},{ timestamps: true});

module.exports = mongoose.model('Citation',CitationSchema);