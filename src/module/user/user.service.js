import asyncErrorHandler from "../../utility/asyncErrorHandler.js";
import Organization from "../organization/organization.model.js";
import User from "./user.model.js";

const processSignup = asyncErrorHandler(
  async (name, password, email, organizationId) => {
    const userExists = await User.findOne({
      email: email,
    });
    if (userExists) {
      throw new Error("You have already created an account.");
    }

    const organizationExists = await Organization.findOne({
        organizationId
    })

    if(!organizationExists){
        throw new Error("Organization not exists.")
    }
    await User.create({
      name,
      password,
      email,
      organization: organizationExists._id,
    });

    return {
        success: true,
        message: "User signup successfully"
    }
  },
);

const processLogin = asyncErrorHandler(async (password, email) => {});

const processUpdateProfile = asyncErrorHandler(
  async (password, email, name) => {},
);

const processDeactivateAccount = asyncErrorHandler(async (userId) => {});

const userService = {
  processLogin,
  processSignup,
  processUpdateProfile,
  processDeactivateAccount,
};
