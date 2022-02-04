//Following function only accepts an async function to behave as expected.

module.exports = (fn) => (req, res, next) => {
  fn(req, res, next).catch((err) => next(err));
};
