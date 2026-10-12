import asyncErrorHandler from "../../utility/asyncErrorHandler.js";
import userOrgService from "./user-org.service.js";

const userOrgCreate = asyncErrorHandler(async (req, res) => {
  const { name, email, password, organizationName } = req.body;

  const resp = await userOrgService.processCreateUserOrg({
    name,
    email,
    password,
    organizationName,
  });

  if (resp.success) {
    return res.status(201).json({
      success: true,
      message: "user and org created successfully.",
    });
  }

  return res.status(500).json({
    success: false,
    message: resp.message,
  });
});

const userOrgController = {
  userOrgCreate,
};

export default userOrgController;
