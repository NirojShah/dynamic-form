import mongoose, { Schema } from "mongoose";
import SchemaModel from "../form/form.model.js";

const createTemplateResponseSchema = async ({
  templateId,
  orgId,
  formData,
}) => {
  try {
    const collectionName = `${templateId}-${orgId}`;

    const collection = await mongoose.connection.db
      .listCollections({
        name: collectionName,
      })
      .toArray();

    const exists = collection.length > 0;

    const createNewSchema = new Schema(
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

    const formInfo = await SchemaModel.findById(templateId);

    formInfo.responseCount += 1;

    let ResponseModel;

    if (!exists) {
      // create model + collection
      ResponseModel = mongoose.model(
        collectionName,
        createNewSchema,
        collectionName,
      );

      await ResponseModel.create({
        formId: new mongoose.Types.ObjectId(templateId),
        userResponse: formData,
      });

      await formInfo.save();

      return {
        success: true,
        message: "Successfully created schema and added user response.",
      };
    }

    if (exists) {
      ResponseModel =
        mongoose.models[collectionName] ||
        mongoose.model(collectionName, createNewSchema, collectionName);

      await ResponseModel.create({
        formId: new mongoose.Types.ObjectId(templateId),
        userResponse: formData,
      });

      await formInfo.save();

      return {
        success: true,
        message: "Successfully added data to existing schema.",
      };
    }
  } catch (err) {
    return {
      success: false,
      message: err.message,
    };
  }
};

const formDataUtility = {
  createTemplateResponseSchema,
};

export default formDataUtility;
