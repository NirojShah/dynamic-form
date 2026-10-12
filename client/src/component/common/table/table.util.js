export const formatCellValue = (value, field) => {
  if (value === null || value === undefined) {
    return "-";
  }

  if (Array.isArray(value)) {
    return value;
  }

  if (field.type === "date") {
    return new Date(value).toLocaleDateString();
  }

  return value;
};
