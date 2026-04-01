import { model, Schema } from "mongoose";

const OrganizationModel = Schema({
  organizationName: {
    type: String,
    required: true,
  },
  organizationId: {
    type: Number,
    required: true,
  },
});

const Organization = model("Organization", OrganizationModel);

export default Organization;