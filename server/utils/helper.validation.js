const { body } = require('express-validator');

// Validation rules for login
const loginValidationRules = [
  body('email').isEmail().withMessage('Invalid email format'),
  body('password').notEmpty().withMessage('Password cannot be empty'),
];

// Validation rules for logout
const logoutValidationRules = [
  body('email').isEmail().withMessage('Invalid email format'),
];

module.exports = {
  loginValidationRules,
  logoutValidationRules,
};
