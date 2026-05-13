import mongoose from "mongoose";
import SchemaModel from "../form/form.model.js";
import formUtility from "../form/form.utility.js";

const processGetPublicForm = async ({ key }) => {
  const decryptedKey = formUtility.decrypter(key);
  const formExists = await SchemaModel.aggregate([
    {
      $match: {
        _id: new mongoose.Types.ObjectId(decryptedKey),
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
        organizationName: "$organization.organizationName",
        fields: 1,
        name: 1,
        description: 1,
        formId: key,
        _id: 0,
      },
    },
  ]);

  if (formExists.length > 0) {
    await formUtility.updateOpenedValue(decryptedKey);
    return {
      success: true,
      data: formExists[0],
    };
  }
  return {
    success: false,
    message: "failed to find form.",
  };
};

const publicFormService = {
  processGetPublicForm,
};

export default publicFormService;
