import asyncErrorHandler from "../../utility/asyncErrorHandler.js";
import organizationService from "./organization.service.js";

const createOrganization = asyncErrorHandler(async (req, res) => {
  const { organizationName } = req.body;
  if (!organizationName) {
    throw new Error("Organization name is requried.");
  }

  const resp = await organizationService.processCreateOrg({ organizationName });
  if (resp.success) {
    return res.status(201).json({
      status: "success",
      message: resp.message,
    });
  }
  return res.status(500).json({
    status: "failed",
    message: resp.message,
  });
});

const updateOrganizaton = asyncErrorHandler(async (req, res) => {
  const { organizationName, organizationId } = req.body;
  const resp = await organizationService.processUpdateOrg({
    organizationId,
    organizationName,
  });
  if (resp.success) {
    return res.status(200).json({
      status: "success",
      message: resp.message,
    });
  }
  return res.status(500).json({
    status: "failed",
    message: resp.message,
  });
});

const orgController = {
  createOrganization,
  updateOrganizaton,
};

export default orgController;
