const catchAsync = require('../utils/catchAsync');
const User = require('./../Models/userModel');

const AppError = require('./../utils/appError');

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

exports.getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find();

  // SEND RESPONSE
  res.status(200).json({
    status: 'success',
    results: users.length,
    data: {
      users,
    },
  });
});

exports.updateMe = catchAsync(async (req, res, next) => {
  // 1) Create error if user POSTs password data
  if (req.body.password || req.body.passwordConfirm) {
    return next(
      new AppError(
        'This route is not for password updates. Please use /updateMyPassword.',
        400
      )
    );
  }

  // 2) Filtered out unwanted fields names that are not allowed to be updated
  const filteredBody = filterObj(req.body, 'name', 'email');

  // 3) Update user document
  const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: 'success',
    data: {
      user: updatedUser,
    },
  });
});

exports.deleteMe = catchAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user.id, { active: false });

  res.status(204).json({
    status: 'success',
    data: null,
  });
});

exports.getUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined!',
  });
};

exports.createUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined!',
  });
};

exports.updateUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined!',
  });
};

exports.deleteUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined!',
  });
};

exports.addBookToSaved = catchAsync(async (req, res, next) => {
  const { bookId } = req.body; // bookId is the id of the book to be saved
  const userId = req.user.id;
  // console.log(userId);

  // this part is not  too imnportant
  const user = await User.findById(userId);

  // console.log(user)
  if (!user) {
    return next(new AppError('User not found', 404));
  }

  // Check if the book is already saved by the user
  const isBookSaved = user.saved.some(
    (savedBook) => savedBook.bookId.toString() === bookId
  );

  if (isBookSaved) {
    return next(new AppError('Book already saved', 400));
  }

  // Add the book to the "saved" array
  user.saved.push({ bookId });
  console.log(user.saved);

  // Save the updated user document
  await user.save({ validateBeforeSave: false });
  return res
    .status(200)
    .json({ message: 'Book added to saved successfully', saved: user.saved });
});

exports.removeBookFromSaved = catchAsync(async (req, res, next) => {
  const { bookId } = req.body; 
  const userId = req.user.id;

  // Find the user by ID
  const user = await User.findById(userId);
console.log(user)
  if (!user) {
    return next(new AppError('User not found', 404));
  }

  // Check if the book is saved by the user
  const savedBookIndex = user.saved.findIndex(
    (savedBook) => savedBook.bookId.toString() === bookId
  );

  if (savedBookIndex === -1) {
    return next(new AppError('Book not found in saved', 400));
  }

  // Remove the book from the "saved" array
  user.saved.splice(savedBookIndex, 1);
  console.log(user.saved);

  // Save the updated user document
  await user.save({ validateBeforeSave: false });
  return res
    .status(200)
    .json({
      message: 'Book removed from saved successfully',
      saved: user.saved,
    });
});
