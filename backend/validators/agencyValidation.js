const Joi = require("joi");

const agencyValidation = Joi.object({
  role: Joi.string()
    .valid("agency")
    .default("agency")
    .messages({
      "any.only": "Role must be agency",
      "string.base": "Role must be a text value",
    }),

  agencyName: Joi.string()
    .trim()
    .min(2)
    .max(100)
    .required()
    .messages({
      "string.base": "Agency name must be text",
      "string.empty": "Agency name is required",
      "string.min": "Agency name must contain at least 2 characters",
      "string.max": "Agency name cannot exceed 100 characters",
      "any.required": "Please enter agency name",
    }),

  address: Joi.object({
    street: Joi.string()
      .trim()
      .required()
      .messages({
        "string.base": "Street must be text",
        "string.empty": "Street address is required",
        "any.required": "Please enter street address",
      }),

    city: Joi.string()
      .trim()
      .required()
      .messages({
        "string.base": "City must be text",
        "string.empty": "City is required",
        "any.required": "Please enter city",
      }),

    state: Joi.string()
      .trim()
      .required()
      .messages({
        "string.base": "State must be text",
        "string.empty": "State is required",
        "any.required": "Please enter state",
      }),

    pincode: Joi.string()
      .trim()
      .pattern(/^\d{6}$/)
      .required()
      .messages({
        "string.base": "Pincode must be text",
        "string.empty": "Pincode is required",
        "string.pattern.base": "Pincode must be a valid 6-digit Indian pincode",
        "any.required": "Please enter pincode",
      }),

    country: Joi.string()
      .trim()
      .default("India")
      .messages({
        "string.base": "Country must be text",
      }),
  })
    .required()
    .messages({
      "object.base": "Address must be a valid object",
      "any.required": "Address details are required",
    }),

  gst: Joi.object({
    gstin: Joi.string()
      .trim()
      .required()
      .messages({
        "string.base": "GSTIN must be text",
        "string.empty": "GSTIN is required",
        "any.required": "Please enter GSTIN number",
      }),

    legalName: Joi.string()
      .trim()
      .required()
      .messages({
        "string.base": "Legal name must be text",
        "string.empty": "Legal business name is required",
        "any.required": "Please enter legal business name",
      }),

    tradeName: Joi.string()
      .trim()
      .required()
      .messages({
        "string.base": "Trade name must be text",
        "string.empty": "Trade name is required",
        "any.required": "Please enter trade name",
      }),
  })
    .required()
    .messages({
      "object.base": "GST details must be a valid object",
      "any.required": "GST details are required",
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
      "any.required": "Please enter agency email address",
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
      "any.required": "Please enter password",
    }),

  phone: Joi.string()
    .trim()
    .pattern(/^[6-9]\d{9}$/)
    .required()
    .messages({
      "string.base": "Phone number must be text",
      "string.empty": "Phone number is required",
      "string.pattern.base": "Please enter a valid 10-digit Indian mobile number",
      "any.required": "Please enter agency phone number",
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

module.exports = { agencyValidation };