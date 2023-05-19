const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  // description: {
  //   type: String,
  //   required: true,
  // },
  books: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Book',
    },
  ],
});

categorySchema.pre(['find', 'findById'], function (next) {
  this.populate('books');
  next();
});

module.exports = mongoose.model('Category', categorySchema);
