import asyncErrorHandler from "../../utility/asyncErrorHandler.js";
import organizationService from "./organization.service.js";

const createOrganization = asyncErrorHandler(async (req, res) => {
  const { organizationName } = req.body;
  if (!organizationName) {
    throw new Error("Organization name is requried.");
  }

  const resp = await organizationService.processCreateOrg({ organizationName });
});

const updateOrganizaton = asyncErrorHandler(async (req, res) => {});

const orgController = {
  createOrganization,
  updateOrganizaton,
};

export default orgController;
