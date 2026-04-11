import CustomError from "../../utility/customError.js";
import Organization from "./organization.model.js";

const organizationIdGenerator = async () => {
  try {
    const lastOrg = await Organization.findOne().sort({ organizationId: -1 });

    if (!lastOrg) {
      return 1;
    }
    return lastOrg.organizationId + 1;
  } catch (err) {
    throw new CustomError(500, err.message);
  }
};

const processCreateOrg = async ({ organizationName }) => {
  const exists = await Organization.findOne({
    organizationName,
  });

  if (exists) {
    throw new CustomError(500, "Organization already exists.");
  }

  const orgId = await organizationIdGenerator();

  await Organization.create({
    organizationName,
    organizationId: orgId,
  });

  return {
    success: true,
    message: "organization created successfully.",
  };
};

const processUpdateOrg = async ({ organizationName, organizationId }) => {
  const organization = await Organization.findOne({
    organizationId,
  });

  if (!organization) {
    throw new CustomError(500, "organization not found.");
  }
  organization.organizationName = organizationName;
  await organization.save();
  return {
    success: true,
    message: "updated successfully.",
  };
};

const processGetOrganizations = async ({ page = 1, limit = 10 }) => {
  try {
    const skip = (page - 1) * limit;

    const organizations = await Organization.find()
      .skip(skip)
      .limit(limit)
      .sort({ _id: -1 });

    const total = await Organization.countDocuments();

    return {
      success: true,
      data: organizations,
      total,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
    };

  } catch (err) {
    return {
      success: false,
      message: err.message,
    };
  }
};

const organizationService = {
  processCreateOrg,
  processUpdateOrg,
  processGetOrganizations,
};

export default organizationService;
