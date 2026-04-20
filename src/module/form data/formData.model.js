import { model, Schema } from "mongoose";

const userInput = new Schema(
  {
    formId: {
      type: Schema.ObjectId,
      required: [true, "FormId is required."],
    },
    data: {
      type: Schema.Types.Mixed,
      required: true,
    },
    organizationId: {
      type: Schema.ObjectId,
      required: [true, "Organization id is required."],
    },
  },
  { timestamps: true }
);

const UserInput = model("UserInput", userInput);

export default UserInput;