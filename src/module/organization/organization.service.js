import asyncErrorHandler from "../../utility/asyncErrorHandler.js";
import Organization from "./organization.model.js";

const processCreateOrg = asyncErrorHandler(async ({ organizationName }) => {
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
});

const processUpdateOrg = asyncErrorHandler(async () => {});

const organizationService = {
  processCreateOrg,
  processUpdateOrg,
};

export default organizationService;
