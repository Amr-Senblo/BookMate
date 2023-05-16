const jwt = require('jsonwebtoken');
const { promisify } = require('util'); //convert an asynchronous function that uses callbacks into a function that returns a promise.
const mongoose = require('mongoose');
const User = require('../Models/userModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const bcrypt = require('bcryptjs');

// Function that generates the token
// const token = jwt.sign(payload,'secret', {options}
const signToken = (id, email) => {
  return jwt.sign({ id, email }, process.env.TOKEN_KEY, {
    expiresIn: process.env.TOKEN_EXPIRES_IN,
  });
};



exports.signup = catchAsync(async (req, res, next) => {
  // check if user already exist
  // Validate if user exist in our database
  const oldUser = await User.findOne({ email: req.body.email });
  if (oldUser) {
    return next(new AppError('User Already Exist. Please Login', 409));
  }

  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
    isAdmin: req.body.isAdmin,
  });

  const token = signToken({ id: newUser._id, email: newUser.email });
  newUser.token = token;
  res.status(201).json({
    status: 'success',
    token: token,
    data: {
      newUser,
    },
  });
});

exports.login = catchAsync(async (req, res, next) => {
  // 1) check if email and password exist
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new AppError('All input is required', 400));
  }
  //  2) check if user exists && password is correct
  const user = await User.findOne({ email }).select('+password');
  if (!user || !(await user.isCorrectPassword(password, user.password))) {
    return next(new AppError('Incorrect email or password', 401));
  }
  // 3) if every thing is ok send the token to the client
  const token = signToken(user._id, user.email);

  res.status(200).json({
    status: 'success',
    data: {
      token,
    },
  });
});

exports.protect = catchAsync(async (req, res, next) => {
  // 1) check if token exists and Getting it
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }
  if (!token) {
    return next(
      new AppError('You are not logged in! Please log in to get access.', 401)
    );
  }
  // 2) Varifacation token
  const decoded = await promisify(jwt.verify)(token, process.env.TOKEN_KEY);
  console.log(decoded);
  // 3) check if  user still exists ===> this is important for security flow  ,,,
  //  what if the user is deleted in the mean time token is still exist and the user doesn't accutally exist ,,
  //  what if the user has changed the password after the token has been issued
  const currentUser = await User.findById(decoded.id);
  // const currentUser = await User.findOne({_id:decoded.id});
  if (!currentUser) {
    return next(
      new AppError(
        'The user belonging to this token does no longer exist.',
        401
      )
    );
  }
  // 4) check if user changed password after token was issued
  if (currentUser.changedPasswordAfter(decoded.iat)) {
    return next(
      new AppError('User recently changed password! Please log in again.', 401)
    );
  }

  // GRANT ACCESS TO PROTECTED ROUTE
  req.user = currentUser;
  next();
});

exports.restrictToAdmin = (req, res, next) => {
  if (!req.user.isAdmin) {
    return next(
      new AppError('You do not have permission to perform this action', 403)
    );
  }
  next();
};

exports.forgetPassword = async (req, res, next) => {
  // 1) Get user based on POSTed email
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new AppError('There id no user with email address', 404));
  }
  // await user.save({ validateBeforeSave: false });

  // 2) Generate the random reset token
  const resetToken = user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false });


  // 3) Send it to user's email
};

exports.resetPassword = (req, res, next) => {};
