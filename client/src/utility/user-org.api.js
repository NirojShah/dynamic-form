import methods from "../api-instance/apiInstance";

const createUserOrg = async ({ name, email, password, organizationName }) => {
  const resp = await methods.post("/user-org/create", {
    name,
    email,
    password,
    organizationName,
  });

  return resp;
};

const userOrgApis = {
  createUserOrg,
};

export default userOrgApis;
