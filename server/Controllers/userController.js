const catchAsync = require('../utils/catchAsync');
const User = require('./../Models/userModel');

exports.getAllUsers = catchAsync(async (req, res) => {
  const users = User.find();
  res.status(200).json({
    status: 'success',
    data: users,
  });
});
