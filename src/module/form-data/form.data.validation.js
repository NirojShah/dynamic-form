const validatedUserResponse = (data, fields) => {
  try {
    if (!Array.isArray(data)) {
      throw new Error("Invalid payload format. Expected array.");
    }

    const errors = [];

    // ── Build lookup map using label as key (matches what frontend sends) ────
    const dataMap = {};
    data.forEach((item) => {
      dataMap[item.fieldId] = item.value;
    });

    for (const field of fields) {
      // ── Skip layout-only fields immediately ──────────────────────────────
      if (["divider", "heading"].includes(field.type)) continue;

      // ── Look up by label, not UUID key ───────────────────────────────────
      const value = dataMap[field.label];

      // ── REQUIRED CHECK ───────────────────────────────────────────────────
      if (field.required) {
        if (
          value === undefined ||
          value === null ||
          value === "" ||
          (Array.isArray(value) && value.length === 0)
        ) {
          errors.push(`${field.label} is required`);
          continue;
        }
      }

      // ── Skip further validation if empty & not required ──────────────────
      if (value === undefined || value === null || value === "") continue;

      // ── Type-specific validation ─────────────────────────────────────────
      const phoneRegex = /^[0-9]{10,15}$/;
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      switch (field.type) {
        case "text":
        case "textarea":
          if (typeof value !== "string") {
            errors.push(`${field.label} must be a string`);
          }
          break;

        case "email":
          if (!emailRegex.test(value)) {
            errors.push(`${field.label} must be a valid email`);
          }
          break;

        case "phone":
          if (!phoneRegex.test(value)) {
            errors.push(`${field.label} must be a valid phone number`);
          }
          break;

        case "number":
          if (isNaN(value)) {
            errors.push(`${field.label} must be a number`);
          }
          break;

        case "select":
        case "radio": {
          const allowedSingle = (field.options ?? []).map((o) => o.value);
          if (allowedSingle.length > 0 && !allowedSingle.includes(value)) {
            errors.push(`${field.label} has invalid selection`);
          }
          break;
        }

        case "checkbox": {
          if (!Array.isArray(value)) {
            errors.push(`${field.label} must be an array`);
          } else {
            const allowedMulti = (field.options ?? []).map((o) => o.value);
            if (allowedMulti.length > 0) {
              const invalid = value.filter((v) => !allowedMulti.includes(v));
              if (invalid.length > 0) {
                errors.push(`${field.label} has invalid options: ${invalid.join(", ")}`);
              }
            }
          }
          break;
        }

        case "date":
          if (isNaN(Date.parse(value))) {
            errors.push(`${field.label} must be a valid date`);
          }
          break;

        case "rating":
          if (typeof value !== "number" || value < 1 || value > 5) {
            errors.push(`${field.label} must be a number between 1 and 5`);
          }
          break;

        case "scale":
          if (typeof value !== "number" || value < 1 || value > 10) {
            errors.push(`${field.label} must be a number between 1 and 10`);
          }
          break;

        case "file":
          if (typeof value !== "string" || value.trim() === "") {
            errors.push(`${field.label} must be a valid file`);
          }
          break;

        case "signature":
          if (!value || (typeof value === "string" && value.trim() === "")) {
            errors.push(`${field.label} signature is required`);
          }
          break;

        default:
          break;
      }
    }

    if (errors.length > 0) {
      return { success: false, message: errors.join(", ") };
    }

    return { success: true };
  } catch (err) {
    return { success: false, message: err.message };
  }
};

export default validatedUserResponse;