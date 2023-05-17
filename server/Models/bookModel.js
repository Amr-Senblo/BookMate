const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    unique:true,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    // required: true,
  },
  price: {
    type: Number,
  },
  category: {
    type: String,
    required: true,
  },
  imgCover: {
    type: String,
    required: true
  },

  // imageUrl: {
  //   type: String,
  //   required: true,
  // },
  rating: {
    type: Number,
    required: true,
    default: 0,
  },
  downloadLink: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    select: false,
  },
});
const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
