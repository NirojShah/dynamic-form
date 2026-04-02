import asyncErrorHandler from "../../utility/asyncErrorHandler.js";
import Organization from "./organization.model.js";

const processCreateOrg = async ({ organizationName }) => {
  const exists = await Organization.findOne({
    organizationName,
  });

  if (exists) {
    throw new Error("Organization already exists.");
  }

  const organization = await Organization.findOne().sort({
    organizationId: -1,
  });

  await Organization.create({
    organizationName,
    organizationId: organization.organizationId + 1,
  });

  return {
    success: false,
    message: "organization created successfully.",
  };
};

const processUpdateOrg = async ({ organizationName, organizationId }) => {
  const organization = await Organization.findone({
    organizationId,
  });

  if (!organization) {
    throw new Error("organization not found.");
  }
  organization.organizationName = organizationName;
  await organization.save();
  return {
    success: true,
    message: "updated successfully.",
  };
};

const organizationService = {
  processCreateOrg,
  processUpdateOrg,
};

export default organizationService;
