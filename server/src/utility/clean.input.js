const cleanDto = (data) => {
  if (!data || typeof data !== "object" || Array.isArray(data)) {
    throw new Error("Please send data in proper format");
  }
  const filteredObject = {};

  for (let key in data) {
    const value = data[key];

    if (value !== null && value !== "") {
      filteredObject[key] = value;
    }
  }

  return filteredObject;
};

export default cleanDto;
