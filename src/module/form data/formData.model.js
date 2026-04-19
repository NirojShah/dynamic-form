import { Schema } from "mongoose";

const userInput = Schema.create({
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
});
