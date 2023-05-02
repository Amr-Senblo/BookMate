const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const Category = require('./../Models/categoryModel');

exports.getAllCategories = catchAsync(async (req, res) => {
  const categories = await Category.find();
  res.status(200).json({
    result: categories.length,
    categories: categories,
  });
});

exports.getCategory = catchAsync(async (req, res, next) => {
  const category = await Category.findById(req.params.id);
  if (!Category) {
    return next(
      new AppError(`Can't find book with this id : ${req.params.id}`)
    );
  }
  res.status(200).json({
    status: 'success',
    data: {
      category,
    },
  });
});

exports.createCategory = catchAsync(async (req, res) => {
  const category = await Category.create({
    name: req.body.name,
    // description:req.body.description,
    books: req.body.books,
  });
  res.status(201).json({
    status: 'success',
    data: {
      category,
    },
  });
});

exports.addBookToCategory = catchAsync(async (req, res) => {
  let category = await Category.findById(req.params.id);
  await category.books.push(req.body.bookId);
  category.save();
  res.status(201).json({
    status: 'success',
    data: {
      category,
    },
  });
});

exports.deleteBookFromCategory = catchAsync(async (req, res) => {
  const category = await Category.findById(req.params.id);
  category.books = category.books.filter((el) => el != req.body.bookId);

  category.save();
  res.status(200).json({
    status: 'success',
    data: {
      category,
      categoryBooks: category.books,
    },
  });
});
