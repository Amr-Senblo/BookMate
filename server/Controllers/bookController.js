const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const Book = require('./../Models/bookModel');
const path = require('path');
const mongoose = require('mongoose');
const fs = require('fs');
exports.getBook = catchAsync(async (req, res, next) => {
  const book = await Book.findById(req.params.id);
  if (!book) {
    return next(
      new AppError(`Can't find book with this id : ${req.params.id}`)
    );
  }
  res.status(200).json({
    status: 'success',
    book,
  });
});

exports.getAllBooks = catchAsync(async (req, res) => {
  console.log(req.query);

  const books = await Book.find();

  res.status(200).json({
    result: books.length,
    books: books,
  });
});

// These functions are restricted to admin
exports.createBook = catchAsync(async (req, res, next) => {
  const { title, author, description, price, category, rating, downloadLink } =
    req.body;

  console.log(req.file);
  // Convert the cover image to a base64 string
  // const coverImage = req.file.buffer.toString('base64');
  const coverImage = req.body.imgCover;
  if (!coverImage) {
    return new next(AppError('No Image Found', 404));
  } else {
    // Create the book object and save it to the database
    const book = await Book.create({
      title,
      author,
      description,
      price,
      category,
      imgCover: coverImage,
      rating,
      downloadLink,
    });

    res.status(201).json({
      status: 'success',

      book,
    });
  }
});

exports.updateBook = catchAsync(async (req, res) => {
  const book = await Book.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  res.status(201).json({
    status: 'success',

    book,
  });
});

exports.deleteBook = catchAsync(async (req, res) => {
  const book = await Book.findByIdAndDelete(req.params.id);
  res.status(204).json({
    status: 'deleted successfully',
    data: null,
  });
});

exports.downloadBook = catchAsync(async (req, res) => {
  const book = await Book.findById(req.params.id);
  console.log(book);
  const fileName = book.title + '.pdf';
  const filePath = '/../dev-data/Books/' + fileName;

  if (!book) {
    return next(
      new AppError(`Can't find book with this id : ${req.params.id}`)
    );
  }
  res.download(path.resolve(`${__dirname} + ${filePath}`));

});
