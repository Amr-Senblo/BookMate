const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const Book = require('./../Models/bookModel');

exports.getAllBooks = catchAsync(async (req, res) => {
  console.log(req.query);

  const books = await Book.find();

  res.status(200).json({
    result: books.length,
    books: books,
  });
});

exports.getBook = catchAsync(async (req, res, next) => {
  const book = await Book.findById(req.params.id);
  if (!book) {
    return next(
      new AppError(`Can't find book with this id : ${req.params.id}`)
    );
  }
  res.status(200).json({
    status: 'success',
    data: {
      book,
    },
  });
});

// 🔥🔥🔥🔥🔥 HEREEEEEEEEEE !!!!
exports.addBookToSaved = catchAsync(async (req, res) => {});
exports.deleteBookFromSaved = catchAsync(async (req, res) => {});



// These functions are restricted to admin

exports.createBook = catchAsync(async (req, res) => {
  const book = await Book.create({
    title: req.body.title,
    author: req.body.author,
    description: req.body.description,
    category: req.body.category,
    imageUrl: req.body.imageUrl,
    rating: req.body.rating,
    downloadLink: req.body.downloadLink,
  });
  res.status(201).json({
    status: 'success',
    data: {
      book,
    },
  });
});

exports.updateBook = catchAsync(async (req, res) => {
  const book = await Book.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  res.status(201).json({
    status: 'success',
    data: {
      book,
    },
  });
});

exports.deleteBook = catchAsync(async (req, res) => {
  const book = await Book.findByIdAndDelete(req.params.id);
  res.status(204).json({
    status: 'deleted successfully',
    data: null,
  });
});

