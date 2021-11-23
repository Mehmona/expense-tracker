// Init
const { check, validationResult } = require("express-validator");

/*
====================
Validations
====================
*/

// user register Validation
exports.registerUserValidator = [
  check("firstName", "firstName name is required.").notEmpty(),
  check("lastName", "lastName name is required.").notEmpty(),
  check("email", "Email is required.").notEmpty().isEmail().trim(),
  check("password", "Password is required.")
    .notEmpty()
    .trim()
    .isLength({ min: 6 })
    .withMessage("Password min length must be 6 characters"),
];

// user login Validation
exports.loginUserValidator = [
  check("email", "Email is required.").notEmpty().isEmail().trim(),
  check("password", "Password is required.")
    .notEmpty()
    .trim()
    .isLength({ min: 6 })
    .withMessage("min length must be 6 characters"),
];
// create Expense  Validation
exports.createExpenseValidator = [
  check("amount", "amount is required.").notEmpty().trim(),
  check("date", "date is required.").notEmpty().trim(),
];

/*
======================
Result
======================
*/
exports.isValidated = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    let message = errors.array()[0].msg;
    res.status(400).send({ message: message });
  } else {
    next();
  }
};
