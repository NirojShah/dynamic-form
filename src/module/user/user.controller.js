import asyncErrorHandler from "../../utility/asyncErrorHandler.js";
import userService from "./user.service.js";

const createUser = asyncErrorHandler(async (req, res) => {
  const { name, password, email, organizationId } = req.body;
  const resp = await userService.processSignup({
    name,
    email,
    password,
    organizationId,
  });

  if (resp.success) {
    return res.status(201).json({
      status: "success",
      message: "user signedup successfully.",
    });
  }

  return res.status(500).json({
    status: "failed",
    message: resp.message,
  });
});

const login = asyncErrorHandler(async (req, res) => {
  const { email, password } = req.body;

  const resp = await userService.processLogin({ email, password });
  if (resp.success) {
    return res.status(200).json({
      status: "success",
      token: resp.token,
      message: resp.message,
    });
  }

  return res.status(403).json({
    status: "failed",
    message: resp.message,
  });
});

const updateProfile = asyncErrorHandler(async (req, res) => {
  const { password, email, name } = req.body;
  return res.status(200).json({
    password,
    email,
    name,
  });
});

const deactivateProfile = asyncErrorHandler(async (req, res) => {
  const { userId } = req.user;
  const resp = await userService.processDeactivateAccount(userId);
  return res.status(200).json({
    status: "success",
    data: resp,
  });
});

const createAdminProfile = asyncErrorHandler(async (req, res) => {
  const { name, password, email, organizationId } = req.body;
  const resp = await userService.processSignupAdmin({
    name,
    email,
    password,
    organizationId,
  });

  if (resp.success) {
    return res.status(201).json({
      status: "success",
      message: "user signedup successfully.",
    });
  }

  return res.status(500).json({
    status: "failed",
    message: resp.message,
  });
});

const userController = {
  createUser,
  login,
  updateProfile,
  deactivateProfile,
  createAdminProfile,
};

export default userController;
