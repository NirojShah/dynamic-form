import { model, Schema } from "mongoose";

const shareFormSchema = new Schema(
  {
    userId: {
      type: Schema.ObjectId,
      required: [true, "userId is required."],
    },
    formId: {
      type: Schema.ObjectId,
      required: [true, "Form Id is required."],
    },
  },
  {
    timestamps: true,
  },
);

const ShareForm = model("shareForm", shareFormSchema);

export default ShareForm;
