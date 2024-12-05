const Document = require('../models/Document');
const PDFDocument = require("pdfkit");

const createDocument = async (req, res) => {
  const { title, content } = req.body;

  const document = await Document.create({
    title,
    content,
    authors: [req.user.id],
  });

  res.status(201).json(document);
};

const getDocuments = async (req, res) => {
  // console.log('Hit getDocuments');
  const documents = await Document.find({ authors: req.user.id });
  res.json(documents);
};

const getDocumentById = async (req, res) => {
  console.log('Hit getDocumenById');
  const document = await Document.findById(req.params.id).populate('authors').populate('citations').populate('versions');
  
  if (document) {
    res.json(document);
  } else {
    res.status(404).json({ message: 'Document not found' });
  }
};

const updateDocument = async (req, res) => {
  const { title, content } = req.body;
  const document = await Document.findById(req.params.id);

  if (document && document.authors.includes(req.user.id)) {
    document.title = title || document.title;
    document.content = content || document.content;
    await document.save();
    res.json(document);
  } else {
    res.status(403).json({ message: 'Not authorized to update this document' });
  }
};

const deleteDocument = async (req, res) => {
  const document = await Document.findById(req.params.id);

  if (document && document.authors.includes(req.user.id)) {
    await document.remove();
    res.json({ message: 'Document removed' });
  } else {
    res.status(403).json({ message: 'Not authorized to delete this document' });
  }
};

const downloadPDF = async(req,res) => {
  try {
    const document = await Document.findById(req.params.id).catch(()=>null);
    if(!document) {
      return res.status(404).send("Document not found");
    }
    const doc = new PDFDocument();
    res.setHeader("Content-Type","application/pdf");
    res.setHeader("Content-Disposition",`attachment; filename = "${document.title}.pdf"`);
    doc.pipe(res);
    doc.fontSize(20).text(document.title, { align: "center", underline: true});
    doc.moveDown();
    doc.fontSize(14).text(document.content, { align: "justify",lineGap: 6});
    doc.end();
  } catch(error) {
    console.error("Error generating PDF:",error);
    res.status(500).json({ message: "An error occurred while generating the PDF"});
  }
}

module.exports = {
  createDocument,
  getDocuments,
  getDocumentById,
  updateDocument,
  deleteDocument,
  downloadPDF,
};
