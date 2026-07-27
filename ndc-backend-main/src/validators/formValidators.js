const { body, validationResult } = require("express-validator");

const PHONE_REGEX = /^[6-9]\d{9}$/;

function handleValidation(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, message: errors.array()[0].msg, errors: errors.array() });
  }
  next();
}

const applyNowValidators = [
  body("fullName").trim().notEmpty().withMessage("Full name is required"),
  body("phoneNumber").matches(PHONE_REGEX).withMessage("Enter a valid 10-digit phone number"),
  body("email").isEmail().withMessage("Enter a valid email"),
  body("course").trim().notEmpty().withMessage("Course is required"),
  handleValidation,
];

const contactUsValidators = [
  body("fullName").trim().notEmpty().withMessage("Full name is required"),
  body("mobileNumber").matches(PHONE_REGEX).withMessage("Enter a valid 10-digit mobile number"),
  body("email").isEmail().withMessage("Enter a valid email"),
  handleValidation,
];

module.exports = { applyNowValidators, contactUsValidators };
