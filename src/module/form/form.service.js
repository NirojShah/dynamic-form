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

const processGetFormDetail = async ({ organizationName, formName }) => {
  try {
    const organizaitonExists = await Organization.findOne({
      organizationName: organizationName,
    });

    if (!organizaitonExists) {
      return {
        success: false,
        message: "Organizaiton not found.",
      };
    }
    const formExists = await SchemaModel.aggregate([
      {
        $match: {
          name: formName,
          organizationId: organizaitonExists._id,
        },
      },
    ]);

    if (formExists.length > 0) {
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
    const pageNumber = Number(page);
    const limitNumber = Number(limit);

    const skip = (pageNumber - 1) * limitNumber;

    // Get total count
    const totalForms = await SchemaModel.countDocuments({
      public: true,
      organizationId: null,
    });

    // Get paginated forms
    const forms = await SchemaModel.aggregate([
      {
        $match: {
          public: true,
          organizationId: null,
        },
      },
      {
        $project: {
          id: formUtility.encrypter("$_id"),
          _id: 0,
          name: "$name",
          description: "$description",
        },
      },
      {
        $skip: skip,
      },
      {
        $limit: limitNumber,
      },
    ]);

    return {
      success: true,
      data: forms,
      pagination: {
        currentPage: pageNumber,
        limit: limitNumber,
        totalItems: totalForms,
        totalPages: Math.ceil(totalForms / limitNumber),
        hasNextPage: pageNumber < Math.ceil(totalForms / limitNumber),
        hasPreviousPage: pageNumber > 1,
      },
    };
  } catch (err) {
    return {
      success: false,
      message: err.message,
    };
  }
};

const processPublicFormCreation = async ({ organization, formName }) => {
  try {
    const organizationExists = await Organization.findOne({
      organizationName: organization,
    });

    if (!organizationExists) {
      return {
        success: false,
        message: "Invalid Organization Name.",
      };
    }

    const formExists = await SchemaModel.findOne({
      name: formName,
      organizationId: organizationExists._id,
    });

    if (!formExists) {
      return {
        success: false,
        message: "Form not found.",
      };
    }

    // Convert mongoose document to plain object
    const formCopy = formExists.toObject();

    // Remove fields you don't want duplicated
    delete formCopy._id;
    delete formCopy.organizationId;

    // Optional: rename copied form
    formCopy.name = `${formCopy.name} Template.`;
    formCopy.public = true;

    // Create new form
    await SchemaModel.create(formCopy);

    return {
      success: true,
      message: "Form copied successfully",
    };
  } catch (err) {
    return {
      success: false,
      message: err.message,
    };
  }
};

const processUpdateForm = async ({
  title,
  organizationId,
  fields,
  initialName,
  description,
}) => {
  try {
    const organizationExists = await Organization.findById(organizationId);

    if (!organizationExists) {
      return {
        success: false,
        message: "organization not found.",
      };
    }

    const formInfo = await SchemaModel.findOne({
      name: initialName,
      organizationId: new mongoose.Types.ObjectId(organizationId),
    });

    if (!formInfo) {
      throw new Error("form not found.");
    }

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

    formInfo.name = title;
    formInfo.description = description;
    formInfo.fields = transformedFields;

    await formInfo.save();

    return {
      success: true,
      message: "successfully updated the form.",
      data: formInfo,
    };
  } catch (err) {
    return {
      success: false,
      message: err.message,
    };
  }
};

const processFetchArchievedForms = async ({ organizationId }) => {
  try {
    const archievedForms = await SchemaModel.aggregate([
      {
        $match: {
          organizationId: new mongoose.Types.ObjectId(organizationId),
          status: "archieve",
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
          name: "$name",
          organizationName: "$organization.organizationName",
          description: "$description",
        },
      },
    ]);

    return {
      success: true,
      data: archievedForms,
    };
  } catch (err) {
    return {
      success: false,
      message: err.message,
    };
  }
};

const processMarkAsArchive = async ({ title, organizationId }) => {
  try {
    const form = await SchemaModel.findOne({
      name: title,
      organizationId: new mongoose.Types.ObjectId(organizationId),
    });
    if (!form) {
      return {
        success: false,
        message: "form not found.",
      };
    }

    form.status = "archieve";
    await form.save();

    return {
      success: true,
      message: "successfully changed status.",
    };
  } catch (err) {
    return {
      success: false,
      message: err.message,
    };
  }
};

const processGetFavouriteForms = async ({ userId }) => {
  try {
    const favouriteForms = await SchemaModel.aggregate([
      {
        $match: {
          favorite: {
            $in: [new mongoose.Types.ObjectId(userId)],
          },
        },
      },
    ]);

    return {
      success: true,
      data: favouriteForms,
    };
  } catch (err) {
    return {
      success: false,
      message: err.message,
    };
  }
};

const markFormAsFavourite = async ({ title, organizationId, userId }) => {
  try {
    const form = await SchemaModel.findOne({
      name: title,
      organizationId: organizationId,
    });

    if (!form) {
      return {
        success: false,
        message: "form not found.",
      };
    }

    if (!form.favorite) {
      form.favorite = [];
    }

    if (form.favorite.includes(userId)) {
      return {
        success: true,
        message: "already marked.",
      };
    }

    form.favorite.push(new mongoose.Types.ObjectId(userId));

    await form.save();

    return {
      success: true,
      message: "Successfully Marked.",
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
  processPublicFormCreation,
  processUpdateForm,
  processFetchArchievedForms,
  processMarkAsArchive,
  processGetFavouriteForms,
  markFormAsFavourite,
};

export default formService;
