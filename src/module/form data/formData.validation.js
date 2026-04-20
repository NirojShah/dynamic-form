const validators = {
  text: (value, field) => {
    if (typeof value !== "string") {
      return `${field.key} must be a string`;
    }
  },

  email: (value, field) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (typeof value !== "string" || !emailRegex.test(value)) {
      return `${field.key} must be a valid email`;
    }
  },

  number: (value, field) => {
    if (isNaN(value)) {
      return `${field.key} must be a number`;
    }
  },

  select: (value, field) => {
    if (Array.isArray(value)) {
      const invalid = value.some(
        (v) => !field.options?.some((opt) => opt.value === v),
      );
      if (invalid) return `${field.key} has invalid selections`;
    } else {
      if (!field.options?.some((opt) => opt.value === value)) {
        return `${field.key} must be one of the allowed options`;
      }
    }
  },

  relation: (value, field) => {
    if (!mongoose.Types.ObjectId.isValid(value)) {
      return `${field.key} must be a valid ObjectId`;
    }
  },
};

import mongoose from "mongoose";
import asyncErrorHandler from "../../utility/asyncErrorHandler";

const isEmpty = (value) => {
  if (value === undefined || value === null) return true;
  if (typeof value === "string") return value.trim() === "";
  if (Array.isArray(value)) return value.length === 0;
  if (typeof value === "object") return Object.keys(value).length === 0;
  return false;
};

const validateFormData = async ({ data, formFields }) => {
  const errors = {};

  const allowedKeys = formFields.map((f) => f.key);

  // 🚫 Reject unknown fields (important for security)
  for (const key in data) {
    if (!allowedKeys.includes(key)) {
      errors[key] = `${key} is not allowed`;
    }
  }

  for (const field of formFields) {
    const { key, required, type } = field;
    let value = data[key];

    // normalize strings
    if (typeof value === "string") {
      value = value.trim();
    }

    // ✅ Required check
    if (required && isEmpty(value)) {
      errors[key] = `${key} is required`;
      continue;
    }

    // skip if empty & not required
    if (isEmpty(value)) continue;

    // ✅ Type validation via map
    const validator = validators[type];
    if (validator) {
      const error = validator(value, field);
      if (error) errors[key] = error;
    }
  }

  if (Object.keys(errors).length > 0) {
    return {
      success: false,
      errors,
    };
  }

  return {
    success: true,
  };
};

export default asyncErrorHandler(validateFormData);
