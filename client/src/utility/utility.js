const handleFormChange = (e, prevData = {}) => {
  try {
    const { name, value, type, checked, files } = e.target;

    const fieldValue =
      type === "checkbox" ? checked : type === "file" ? files : value;

    return {
      ...prevData,
      [name]: fieldValue,
    };
  } catch (err) {
    return { err };
  }
};

export default handleFormChange;
