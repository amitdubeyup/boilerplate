// Validation middleware example using express-validator
const { body, validationResult } = require('express-validator');

const userValidationRules = () => [
  body('name').isString().isLength({ min: 1 }),
  body('email').isEmail(),
];
const passbookValidationRules = () => [
  body('amount').isNumeric().custom(value => value > 0),
];

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

module.exports = {
  userValidationRules,
  passbookValidationRules,
  validate,
};
