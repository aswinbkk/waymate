const Joi = require("joi");

const userValidation = Joi.object({
  role: Joi.string()
    .valid("user")
    .default("user")
    .messages({
      "any.only": "Role must be user",
      "string.base": "Role must be a text value",
    }),

  fullName: Joi.object({
    firstName: Joi.string()
      .trim()
      .min(2)
      .max(30)
      .pattern(/^[A-Za-z]+$/)
      .required()
      .messages({
        "string.base": "First name must be text",
        "string.empty": "First name is required",
        "string.min": "First name must contain at least 2 characters",
        "string.max": "First name cannot exceed 30 characters",
        "string.pattern.base": "First name should contain only alphabets",
        "any.required": "Please enter your first name",
      }),

    lastName: Joi.string()
      .trim()
      .min(2)
      .max(30)
      .pattern(/^[A-Za-z]+$/)
      .required()
      .messages({
        "string.base": "Last name must be text",
        "string.empty": "Last name is required",
        "string.min": "Last name must contain at least 2 characters",
        "string.max": "Last name cannot exceed 30 characters",
        "string.pattern.base": "Last name should contain only alphabets",
        "any.required": "Please enter your last name",
      }),
  })
    .required()
    .messages({
      "object.base": "Full name must be a valid object",
      "any.required": "Full name is required",
    }),

  email: Joi.string()
    .trim()
    .lowercase()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      "string.base": "Email must be text",
      "string.email": "Please enter a valid email address",
      "string.empty": "Email is required",
      "any.required": "Please enter your email address",
    }),

  password: Joi.string()
    .min(8)
    .max(20)
    .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])\S+$/)
    .required()
    .messages({
      "string.base": "Password must be text",
      "string.empty": "Password is required",
      "string.min": "Password must contain at least 8 characters",
      "string.max": "Password cannot exceed 20 characters",
      "string.pattern.base": "Password must include uppercase, lowercase, number, special character and no spaces",
      "any.required": "Please enter your password",
    }),

  phone: Joi.string()
    .trim()
    .pattern(/^[6-9]\d{9}$/)
    .required()
    .messages({
      "string.base": "Phone number must be text",
      "string.empty": "Phone number is required",
      "string.pattern.base": "Please enter a valid 10-digit Indian mobile number",
      "any.required": "Please enter your phone number",
    }),

  otp: Joi.string()
    .pattern(/^\d{4,6}$/)
    .optional()
    .messages({
      "string.pattern.base": "OTP must contain 4 to 6 digits only",
    }),

  otpExpire: Joi.date()
    .optional()
    .messages({
      "date.base": "OTP expiry must be a valid date",
    }),
})
  .options({
    abortEarly: false,
    allowUnknown: false,
    stripUnknown: true,
  });


// updateUserValidation
const updateUserValidation = Joi.object({
  fullName: Joi.object({
    firstName: Joi.string()
      .trim()
      .min(2)
      .max(30)
      .pattern(/^[A-Za-z]+$/)
      .messages({
        "string.base":
          "First name must be text",

        "string.empty":
          "First name cannot be empty",

        "string.min":
          "First name must contain at least 2 characters",

        "string.max":
          "First name cannot exceed 30 characters",

        "string.pattern.base":
          "First name should contain only alphabets",
      }),

    lastName: Joi.string()
      .trim()
      .min(2)
      .max(30)
      .pattern(/^[A-Za-z]+$/)
      .messages({
        "string.base":
          "Last name must be text",

        "string.empty":
          "Last name cannot be empty",

        "string.min":
          "Last name must contain at least 2 characters",

        "string.max":
          "Last name cannot exceed 30 characters",

        "string.pattern.base":
          "Last name should contain only alphabets",
      }),
  })
    .messages({
      "object.base":
        "Full name must be a valid object",
    }),

  email: Joi.string()
    .trim()
    .lowercase()
    .email({ tlds: { allow: false } })
    .messages({
      "string.base":
        "Email must be text",

      "string.email":
        "Please enter a valid email address",

      "string.empty":
        "Email cannot be empty",
    }),

  phone: Joi.string()
    .trim()
    .pattern(/^[6-9]\d{9}$/)
    .messages({
      "string.base":
        "Phone number must be text",

      "string.empty":
        "Phone number cannot be empty",

      "string.pattern.base":
        "Please enter a valid 10-digit Indian mobile number",
    }),
})
  // At least one field required
  .min(1)
  .messages({
    "object.min":
      "Please provide at least one field to update",
  })

  .options({
    abortEarly: false,
    allowUnknown: false,
    stripUnknown: true,
  });

module.exports = { userValidation, updateUserValidation };