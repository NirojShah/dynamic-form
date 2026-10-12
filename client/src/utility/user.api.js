import methods from "../api-instance/apiInstance";

const login = async ({ email, password }) => {
  try {
    const resp = await methods.post("/user/login", { email, password }, false);
    if (resp.success) {
      localStorage.setItem("token", resp.token);
      return {
        success: true,
      };
    }
  } catch (err) {
    console.log(err);
  }
};

const signUp = async ({ name, email, password, organizationId }) => {
  try {
    const resp = methods.post("/user/signup", {
      name,
      email,
      password,
      organizationId,
    });
    if (resp.data.status == "success") {
      console.log("signup successfully.");
    }
  } catch (error) {
    console.log(error.message);
  }
};

const getMe = async () => {
  try {
    const resp = await methods.get("/user/me");
    return resp;
  } catch (err) {
    return {
      success: false,
      message: err.message,
    };
  }
};

const updateProfile = async (payload) => {
  const resp = await methods.patch("/user/update", payload);
  return resp;
};

const updatePassword = async ({ curPass, newPass }) => {
  const resp = await methods.patch("/user/update/password", {
    curPass,
    newPass,
  });
  return resp;
};

const userApis = {
  login,
  signUp,
  getMe,
  updateProfile,
  updatePassword,
};

export default userApis;
