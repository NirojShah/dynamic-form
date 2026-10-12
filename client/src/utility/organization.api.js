import methods from "../api-instance/apiInstance";

const getAllOrganizations = async () => {
  try {
    const resp = await methods.get("/org");

    if (resp.status === "success") {
      console.log(resp);
    }

  } catch (err) {
    console.log(err);
  }
};

const orgApis = {
  getAllOrganizations,
};

export default orgApis;
