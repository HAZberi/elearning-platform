const catchAsync = require('../utils/catchAsync');

exports.register = catchAsync(async (req, res, next) => {
  res.status(200).json({
    status: 'success',
    message: 'Hello World from the server side',
  });
});
