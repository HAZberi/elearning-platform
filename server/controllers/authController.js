const catchAsync = require('../utils/catchAsync');

exports.register = catchAsync(async (req, res, next) => {
  console.log(req.body);
  res.status(201).json({
    status: 'success',
    data: { ...req.body },
  });
});
