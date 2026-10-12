import userApis from "./user.api";

const getMe = async () => {
  try {
    const resp = await userApis.getMe();
    return resp;
  } catch (err) {
    return {
      success: "failed",
      message: err.message,
    };
  }
};

export default getMe;
