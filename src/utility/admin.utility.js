import Organization from "../module/organization/organization.model.js";
import organizationService from "../module/organization/organization.service.js";
import User from "../module/user/user.model.js";

const createUserAndOrg = async ({ name, email, password, role, orgnName }) => {
  try {
    const organizationExists = await Organization.findOne({
      organizationName: orgnName,
    });

    if (organizationExists) {
      return {
        display: false,
        success: false,
        message: "organization Alrealdy exists",
      };
    }

    const generateOrganizationId =
      await organizationService.organizationIdGenerator();

    const organization = await Organization.create({
      organizationId: generateOrganizationId,
      organizationName: orgnName,
    });

    await User.create({
      name,
      email,
      password,
      organization: organization._id,
      role: role,
    });

    return {
      display: true,
      success: true,
      message: "super_admin created successfully.",
    };
  } catch (err) {
    return {
      display: true,
      success: false,
      message: "failed to create super admin." + err.message,
    };
  }
};

export default createUserAndOrg;
