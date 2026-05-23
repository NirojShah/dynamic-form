import { Types } from "mongoose";
import SubmittedResponse from "./form.data.model.js";
import fileService from "../file-storage/file.storage.service.js";
import SchemaModel from "../form/form.model.js";

const processUploadResponse = async ({ formId, data }) => {
  try {
    const userResponse = {};

    for (const { fieldId, value, file } of data) {
      if (file) {
        const result = await fileService.processUploadFile(file);
        if (!result.success) {
          return {
            success: false,
            message: `Failed to upload ${fieldId}: ${result.message}`,
          };
        }
        userResponse[fieldId] = result.fileId;
      } else {
        userResponse[fieldId] = value;
      }
    }

    await SubmittedResponse.create({
      formId: new Types.ObjectId(formId),
      userResponse,
    });

    return { success: true, message: "Response submitted successfully." };
  } catch (err) {
    return { success: false, message: err.message };
  }
};

const processGetUserResponse = async (formId, page = 1, limit = 10) => {
  try {
    const skip = (Number(page) - 1) * Number(limit);

    const [formResult, responses, total] = await Promise.all([
      SchemaModel.aggregate([
        { $match: { _id: new Types.ObjectId(formId) } },
        {
          $project: {
            fields: {
              $map: {
                input: "$fields",
                as: "f",
                in: { label: "$$f.label", type: "$$f.type" },
              },
            },
          },
        },
      ]),
      SubmittedResponse.find({ formId })
        .skip(skip)
        .limit(Number(limit))
        .sort({ createdAt: -1 })
        .lean(),
      SubmittedResponse.countDocuments({ formId }),
    ]);

    if (!formResult.length) {
      return { success: false, message: "Form not found." };
    }

    return {
      success: true,
      data: responses,
      fields: formResult[0].fields,
      pagination: {
        total,
        page: Number(page),
        limit: Number(limit),
        totalPages: Math.ceil(total / Number(limit)),
      },
    };
  } catch (err) {
    return { success: false, message: err.message };
  }
};

const formDataService = {
  processUploadResponse,
  processGetUserResponse,
};

export default formDataService;
