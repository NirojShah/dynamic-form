import asyncErrorHandler from "../../utility/asyncErrorHandler.js";

const createUser = asyncErrorHandler(async (req, res) => {
  const { name, password, email, organizationId } = req.body;
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
