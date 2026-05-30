import mongoose, { Schema, Types } from "mongoose";
import fileService from "../file-storage/file.storage.service.js";
import SchemaModel from "../form/form.model.js";
import formDataUtility from "./form.data.utility.js";

const processUploadResponse = async ({ formId, orgId, data }) => {
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

    const insertData = await formDataUtility.createTemplateResponseSchema({
      templateId: formId,
      formData: userResponse,
      orgId: orgId,
    });

    if (insertData.success) {
      return { success: true, message: "Response submitted successfully." };
    }

    return {
      success: false,
      message: insertData.message,
    };
  } catch (err) {
    return { success: false, message: err.message };
  }
};

const processGetUserResponse = async ({
  formId,
  organizationId,
  page = 1,
  limit = 10,
}) => {
  try {
    const collectionName = `${formId}-${organizationId}`;

    const collectionExists = await mongoose.connection.db
      .listCollections({
        name: collectionName,
      })
      .toArray();

    const exists = collectionExists.length > 0;

    const schema = new Schema(
      {
        formId: {
          type: Schema.Types.ObjectId,
          required: [true, "Form Id is required."],
        },
        userResponse: {
          type: Schema.Types.Mixed,
          required: [true, "data is required"],
        },
      },
      {
        timestamps: true,
      },
    );

    if (exists) {
      const respModel =
        mongoose.models[collectionName] ||
        mongoose.model(collectionName, schema, collectionName);

      const skip = (Number(page) - 1) * Number(limit);

      const [formResult, responses, total] = await Promise.all([
        SchemaModel.aggregate([
          {
            $match: {
              _id: new Types.ObjectId(formId),
            },
          },
          {
            $project: {
              fields: {
                $map: {
                  input: "$fields",
                  as: "f",
                  in: {
                    label: "$$f.label",
                    type: "$$f.type",
                  },
                },
              },
            },
          },
        ]),

        respModel
          .find({ formId: new Types.ObjectId(formId) })
          .skip(skip)
          .limit(Number(limit))
          .sort({ createdAt: -1 })
          .lean(),

        respModel.countDocuments({
          formId: new Types.ObjectId(formId),
        }),
      ]);

      if (!formResult.length) {
        return {
          success: false,
          message: "Form not found.",
        };
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
    }
    return {
      success: true,
      data: [],
      pagination: {
        total: 0,
        page: Number(page),
        limit: Number(limit),
        totalPages: 0,
      },
    };
  } catch (err) {
    return {
      success: false,
      message: err.message,
    };
  }
};

const formDataService = {
  processUploadResponse,
  processGetUserResponse,
};

export default formDataService;
