const Joi = require("joi");

const agencyValidation = Joi.object({
  agencyName: Joi.string()
    .trim()
    .min(2)
    .max(100)
    .required()
    .messages({
      "string.empty": "Agency name is required",
      "string.min": "Agency name must be at least 2 characters",
      "string.max": "Agency name cannot exceed 100 characters",
      "any.required": "Agency name is required",
    }),

  address: Joi.object({
    street: Joi.string()
      .trim()
      .required()
      .messages({
        "string.empty": "Street is required",
        "any.required": "Street is required",
      }),

    city: Joi.string()
      .trim()
      .required()
      .messages({
        "string.empty": "City is required",
        "any.required": "City is required",
      }),

    state: Joi.string()
      .trim()
      .required()
      .messages({
        "string.empty": "State is required",
        "any.required": "State is required",
      }),

    pincode: Joi.string()
      .pattern(/^\d{6}$/)
      .required()
      .messages({
        "string.pattern.base": "Pincode must be a valid 6-digit number",
        "string.empty": "Pincode is required",
        "any.required": "Pincode is required",
      }),

    country: Joi.string().default("India"),
  })
    .required()
    .messages({
      "any.required": "Address is required",
    }),

  gst: Joi.object({
    gstin: Joi.string()
      .required()
      .messages({
        "string.empty": "GSTIN is required",
        "any.required": "GSTIN is required",
      }),

    legalName: Joi.string()
      .trim()
      .required()
      .messages({
        "string.empty": "Legal name is required",
        "any.required": "Legal name is required",
      }),

    tradeName: Joi.string()
      .trim()
      .required()
      .messages({
        "string.empty": "Trade name is required",
        "any.required": "Trade name is required",
      }),
  })
    .required()
    .messages({
      "any.required": "GST details are required",
    }),

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
        "Password must include uppercase, lowercase, number, special character and must not contain spaces",
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
})
.options({
  abortEarly: false,
  allowUnknown: false,
  stripUnknown: true,
});

module.exports = { agencyValidation };