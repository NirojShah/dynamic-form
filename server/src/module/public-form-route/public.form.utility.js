const parseFormPayload = (rawBody, files) => {
  const dataArray = [];

  Object.keys(rawBody).forEach((k) => {
    // ── Regular fields: keys are "0", "1", "2" ... ──
    if (/^\d+$/.test(k)) {
      try {
        const parsed = JSON.parse(rawBody[k]); // { key: label, value }
        dataArray.push({
          fieldId: parsed.key, // e.g. "First Name"
          value: parsed.value, // e.g. "Niroj"
        });
      } catch {
        // skip malformed
      }
    }

    // ── File metadata: keys are "file_10_meta", "file_11_meta" ... ──
    else if (/^file_\d+_meta$/.test(k)) {
      try {
        const meta = JSON.parse(rawBody[k]); // { key: label, fileName }
        const fileKey = k.replace("_meta", ""); // "file_10"
        const file = files?.[fileKey] ?? null;

        dataArray.push({
          fieldId: meta.key, // e.g. "Upload your resume."
          value: file ? meta.fileName : null, // filename string for validator
          file, // actual multer/fileupload object
        });
      } catch {
        // skip malformed
      }
    }
  });

  return dataArray;
};

export default parseFormPayload;
