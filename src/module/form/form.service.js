// service/form.service.js

import mongoose from "mongoose";
import SchemaModel from "./form.model.js";
import CustomError from "../../utility/customError.js";
import Organization from "../organization/organization.model.js";
import formUtility from "./form.utility.js";

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

const processAllForms = async ({ orgId }) => {
  try {
    const forms = await SchemaModel.aggregate([
      {
        $match: {
          organizationId: new mongoose.Types.ObjectId(orgId),
        },
      },
      {
        $lookup: {
          from: "organizations",
          localField: "organizationId",
          foreignField: "_id",
          as: "organization",
        },
      },
      {
        $unwind: "$organization",
      },
      {
        $project: {
          name: 1,
          createdBy: 1,
          organizationName: "$organization.organizationName",
          description: 1,
        },
      },
    ]);
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

const createFormWithfields = async ({ title, desc, fields, orgId, userId }) => {
  try {
    const transformedFields = fields.map((field) => ({
      key: field.id,
      label: field.label,
      type: field.type,
      placeholder: field.placeholder,
      required: field.required,

      options: field.options
        ? field.options.map((opt) => ({
            label: opt,
            value: opt,
          }))
        : [],
    }));

    const form = await SchemaModel.create({
      name: title,
      description: desc,
      organizationId: orgId,
      createdBy: userId,
      updatedBy: userId,
      fields: transformedFields,
    });

    return {
      success: true,
      data: form,
    };
  } catch (err) {
    return {
      success: false,
      message: err.message,
    };
  }
};

const processGeneratePublicLink = async ({ name, organizationName }) => {
  try {
    const organizationExists = await Organization.findOne({
      organizationName,
    });

    if (!organizationExists) {
      return {
        success: false,
        message: "invalid Organization Name.",
      };
    }
    const formExists = await SchemaModel.aggregate([
      {
        $match: {
          name: name,
          organizationId: organizationExists._id,
        },
      },
    ]);

    if (formExists.length > 0) {
      const encryptedId = formUtility.encrypter(formExists[0]._id);
      return {
        success: true,
        data: {
          url: encryptedId,
        },
      };
    }
    return {
      success: false,
      message: "form not found.",
    };
  } catch (err) {
    return {
      success: false,
      message: err.message,
    };
  }
};

const processDeleteForm = async ({ key }) => {
  try {
    const formId = formUtility.decrypter(key);
    const formExists = await SchemaModel.findById(formId);
    if (!formExists) {
      throw new Error("Form not found.");
    }
    formExists.status = "deleted";
    await formExists.save();

    return {
      success: true,
      message: "status changed successfully.",
    };
  } catch (err) {
    return {
      success: false,
      message: err.message,
    };
  }
};

const processGetPublicForms = async ({ page = 1, limit = 10 }) => {
  try {
    const skip = (page - 1) * limit;

    const forms = await SchemaModel.aggregate([
      {
        $match: {
          public: true,
        },
      },
      {
        $skip: skip,
      },
      {
        $limit: limit,
      },
    ]);

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

const formService = {
  processCreateForm,
  processAddFields,
  processAllForms,
  processGetFormDetail,
  createFormWithfields,
  processGeneratePublicLink,
  processDeleteForm,
  processGetPublicForms,
};

export default formService;
