import mongoose, { model, Schema } from "mongoose";

const SubmittedResponseSchema = new Schema(
  {
    formId: {
      type: mongoose.Types.ObjectId,
      required: [true, "FormId is required."],
    },
    userResponse: {
      type: Schema.Types.Mixed,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const SubmittedResponse = model("UserResponse", SubmittedResponseSchema);

export default SubmittedResponse;
