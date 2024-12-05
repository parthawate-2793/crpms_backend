const mongoose = require('mongoose');

const DocumentSchema = new mongoose.Schema({
    title: {type:String, required: true},
    content: {type: String, required: true },
    authors: [{type: mongoose.Schema.Types.ObjectId, ref: 'User',index: true}],
    citations: [{type: mongoose.Schema.Types.ObjectId,ref: 'Citation'}],
    versions: [{type: mongoose.Schema.Types.ObjectId, ref: 'Version'}],
},{timestamps: true});

module.exports= mongoose.model('Document',DocumentSchema);