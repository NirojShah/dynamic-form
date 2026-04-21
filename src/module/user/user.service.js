import jwt from "jsonwebtoken";
import cleanDto from "../../utility/clean.input.js";
import CustomError from "../../utility/customError.js";
import Organization from "../organization/organization.model.js";
import User from "./user.model.js";

const processSignup = async ({ name, password, email, organizationId }) => {
  const userExists = await User.findOne({
    email: email,
  });
  if (userExists) {
    throw new CustomError(500, "You have already created an account.");
  }

  const organizationExists = await Organization.findOne({
    organizationId,
  });

  if (!organizationExists) {
    throw new CustomError(500, "Organization not exists.");
  }
  await User.create({
    name,
    password,
    email,
    organization: organizationExists._id,
  });

  return {
    success: true,
    message: "User signup successfully",
  };
};

const processLogin = async ({ password, email }) => {
  try {
    const userExists = await User.findOne({
      email,
    });

    if (!userExists) {
      return {
        status: "failed",
        message: "user not exists please create an account.",
      };
    }
    const correctPass = userExists.password == password;
    if (!correctPass) {
      return {
        status: "failed",
        message: "password not matching.",
      };
    }

    const token = jwt.sign(
      {
        name: userExists.name,
        organizationId: userExists.organization,
        userId: userExists._id,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" },
    );

    return {
      success: true,
      token: token,
    };
  } catch (err) {
    console.log(err);
    return {
      status: "failed",
      message: err.message,
    };
  }
};

const processUpdateProfile = async (userId, password, email, name) => {
  const cleanData = cleanDto({ password, email, name });

  if (Object.keys(cleanData).length === 0) {
    throw new CustomError(500, "No valid fields provided for update");
  }

  if (cleanData.email) {
    const userExists = await User.findOne({
      email: cleanData.email,
      _id: { $ne: userId },
    });

    if (userExists) {
      throw new CustomError(500, "Email already in use");
    }
  }

  if (cleanData.password) {
    const saltRounds = 10;
    // cleanData.password = await bcrypt.hash(cleanData.password, saltRounds);
  }

  const updatedUser = await User.findByIdAndUpdate(
    userId,
    { $set: cleanData },
    {
      new: true,
      runValidators: true,
    },
  );
  if (!updatedUser) {
    throw new CustomError(500, "User not found");
  }

  return updatedUser;
};

const processDeactivateAccount = async (userId) => {};

const processSignupAdmin = async ({ email, password, name }) => {
  const adminExists = await User.aggregate([
    {
      $match: {
        role: {
          $in: "Admin",
        },
      },
    },
  ]);

  if (adminExists.length() > 0) {
    return {
      success: false,
      message: "Admin already exists.",
    };
  }
};

const userService = {
  processLogin,
  processSignup,
  processUpdateProfile,
  processDeactivateAccount,
};

export default userService;
