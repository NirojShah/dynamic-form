import CustomError from "../../utility/customError.js";

const checkFormFields = (fields) => {
  try {
    if (!Array.isArray(fields)) {
      throw new CustomError(500, "Please send the fields in Array Format");
    }
    const filteredform = [];
    for (let item of fields) {
      if (!item.key || !item.label || !item.type) {
        console.log(item);
        throw new CustomError(
          500,
          "Please send form required fields - key, lable, type",
        );
      }

      filteredform.push(item);
    }

    return {
      success: true,
      fields: filteredform,
    };
  } catch (err) {
    return {
      success: false,
      message: err.message,
    };
  }
};

export default checkFormFields;
