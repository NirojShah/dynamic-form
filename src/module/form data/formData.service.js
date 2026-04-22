import mongoose from "mongoose";
import SchemaModel from "../form/form.model.js";
import UserInput from "./formData.model.js";
import CustomError from "../../utility/customError.js";

const processUploadData = async ({
  formData,
  formId,
  organizationId,
  submittedBy,
}) => {
  try {
    const alreadyPresent = await UserInput.aggregate([
      {
        $match: {
          formId: formId,
          submittedBy: submittedBy,
        },
      },
    ]);

    if (alreadyPresent.length() > 0) {
      return {
        success: false,
        message: "You have already submitted the form.",
      };
    }

    const createdEntry = await UserInput.create({
      formId,
      organizationId,
      data: formData,
    });

    return {
      success: true,
      data: createdEntry,
    };
  } catch (err) {
    return {
      success: false,
      message: err.message,
    };
  }
};

const processGetFormData = async ({ page = 1, limit = 10, formId }) => {
  if (!formId) {
    return {
      success: false,
      message: "formId is required.",
    };
  }
  const formExists = await SchemaModel.findById(formId);

  if (!formExists) {
    throw new CustomError(400, "Please send valid formId");
  }

  const offset = (page - 1) * limit;

  const [data, total] = await Promise.all([
    UserInput.find({ formId })
      .skip(offset)
      .limit(limit)
      .sort({ createdAt: -1 }),

    UserInput.countDocuments({ formId }),
  ]);

  return {
    success: true,
    data,
    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
  };
};

const formDataService = {
  processUploadData,
  processGetFormData,
};

export default formDataService;
