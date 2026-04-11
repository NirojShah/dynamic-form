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
});

const updateProfile = asyncErrorHandler(async (req, res) => {
  const { password, email, name } = req.body;
});

const deactivateProfile = asyncErrorHandler(async (req, res) => {
  const { userId } = req.user;
});

const userController = {
  createUser,
  login,
  updateProfile,
  deactivateProfile,
};

export default userController;
