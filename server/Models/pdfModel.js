const mongoose = require('mongoose');
const { Schema } = mongoose;

const pdfSchema = new Schema({
  filename: {
    type: String,
    required: true,
    unique: true,
  },
  contentType: {
    type: String,
    required: true,
  },
  uploadDate: {
    type: Date,
    default: Date.now,
  },
  size: {
    type: Number,
  },
  fileId: {
    type: Schema.Types.ObjectId,
    required: true,
    unique: true,
  },
});

const PDF = mongoose.model('PDF', pdfSchema);
module.exports = PDF;
