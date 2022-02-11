const catchAsync = require('../utils/catchAsync');
const User = require('../models/userModel');

exports.register = catchAsync(async (req, res, next) => {
  const newUser = await User.create(req.body);

  //Filter newUser data to create a customized api response
  const { name, email, createdAt } = newUser;

  res.status(201).json({
    status: 'success',
    data: {
      name,
      email,
      createdAt,
    },
  });
});
