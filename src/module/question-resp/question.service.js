import mongoose, { Schema } from "mongoose";

const questionResponse = async ({ aggregatePipeline, formId, orgId }) => {
  try {
    const collectionName = `${formId}-${orgId}`;

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

      const formResult = await respModel.aggregate(aggregatePipeline);

      return {
        success: true,
        data: formResult,
      };
    }

    return {
      success: false,
      message: "Form response collection not found.",
    };
  } catch (err) {
    return {
      success: false,
      message: err.message,
    };
  }
};

const questionService = {
  questionResponse,
};

export default questionService;
