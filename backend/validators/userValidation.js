const Joi = require("joi");

const userValidation = Joi.object({
  role: Joi.string()
    .valid("user", "admin")
    .default("user")
    .messages({
      "any.only": "Role must be either user or admin",
    }),

  fullName: Joi.object({
    firstName: Joi.string()
      .trim()
      .min(2)
      .max(30)
      .pattern(/^[A-Za-z]+$/)
      .required()
      .messages({
        "string.empty": "First name is required",
        "string.min": "First name must be at least 2 characters",
        "string.max": "First name cannot exceed 30 characters",
        "string.pattern.base": "First name must contain only letters",
        "any.required": "First name is required",
      }),

    lastName: Joi.string()
      .trim()
      .min(2)
      .max(30)
      .pattern(/^[A-Za-z]+$/)
      .required()
      .messages({
        "string.empty": "Last name is required",
        "string.min": "Last name must be at least 2 characters",
        "string.max": "Last name cannot exceed 30 characters",
        "string.pattern.base": "Last name must contain only letters",
        "any.required": "Last name is required",
      }),
  }).required(),

  email: Joi.string()
    .trim()
    .lowercase()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      "string.email": "Please enter a valid email address",
      "string.empty": "Email is required",
      "any.required": "Email is required",
    }),

  password: Joi.string()
    .min(8)
    .max(20)
    .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])\S+$/)
    .required()
    .messages({
      "string.min": "Password must be at least 8 characters",
      "string.max": "Password cannot exceed 20 characters",
      "string.pattern.base":
        "Password must include uppercase, lowercase, number, special character and no spaces",
      "string.empty": "Password is required",
      "any.required": "Password is required",
    }),

  phone: Joi.string()
    .trim()
    .pattern(/^[6-9]\d{9}$/)
    .required()
    .messages({
      "string.pattern.base":
        "Phone number must be a valid 10-digit Indian mobile number",
      "string.empty": "Phone number is required",
      "any.required": "Phone number is required",
    }),

  otp: Joi.string()
    .pattern(/^\d{4,6}$/)
    .optional()
    .messages({
      "string.pattern.base": "OTP must be 4 to 6 digits",
    }),

  otpExpire: Joi.date().optional(),
});

module.exports = { userValidation };