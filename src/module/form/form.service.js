// service/form.service.js

import mongoose from "mongoose";
import SchemaModel from "./form.model.js";
import CustomError from "../../utility/customError.js";

const processCreateForm = async ({ name, organizationId, createdBy }) => {
  const form = await SchemaModel.create({
    name,
    organizationId,
    createdBy,
    updatedBy: createdBy,
    fields: [],
  });

  return form;
};

const processAddFields = async ({ formId, fields, updatedBy }) => {
  const form = await SchemaModel.findByIdAndUpdate(
    formId,
    {
      $push: {
        fields: { $each: fields },
      },
      updatedBy,
    },
    { new: true },
  );

  return form;
};

const processAllForms = async () => {
  try {
    const forms = await SchemaModel.aggregate([{ $match: {} }]);
    return {
      success: true,
      data: forms,
    };
  } catch (err) {
    return {
      success: false,
      message: err.message,
    };
  }
};

const processGetFormDetail = async ({ formId }) => {
  try {
    const formExists = await SchemaModel.aggregate([
      {
        $match: {
          _id: mongoose.Types.ObjectId(formId),
        },
      },
    ]);
    if (formExists.length() > 0) {
      return {
        success: true,
        data: formExists[0],
      };
    }
    throw new CustomError(500, "Form not found");
  } catch (err) {
    return {
      success: false,
      message: err.message,
    };
  }
};

const formService = {
  processCreateForm,
  processAddFields,
  processAllForms,
  processGetFormDetail,
};

export default formService;
