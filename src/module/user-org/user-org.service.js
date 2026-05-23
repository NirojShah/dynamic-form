import Organization from "../organization/organization.model.js";
import organizationService from "../organization/organization.service.js";
import User from "../user/user.model.js";

const processCreateUserOrg = async ({
  name,
  email,
  password,
  organizationName,
}) => {
  try {
    const userExists = await User.findOne({
      email: email,
    });

    if (userExists) {
      return {
        success: false,
        message: "Email already exists.",
      };
    }

    const orgExists = await Organization.findOne({
      organizationName,
    });

    if (orgExists) {
      return {
        success: false,
        message: "Organization already exists.",
      };
    }

    const newOrg = await organizationService.processCreateOrg({
      organizationName: organizationName,
    });

    if (!newOrg.success) {
      return {
        success: false,
        message: newOrg.message,
      };
    }

    await User.create({
      email,
      name,
      password,
      role: "Admin",
      organization: newOrg.organizationId,
    });

    return {
      success: true,
      message: "user and org created successfully.",
    };
  } catch (err) {
    return {
      success: false,
      message: err.message,
    };
  }
};

const userOrgService = {
  processCreateUserOrg,
};

export default userOrgService;
