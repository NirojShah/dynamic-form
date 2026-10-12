import methods from "../api-instance/apiInstance";
import { showError, showSuccess } from "../notification/notification.service";

const myforms = async () => {
  try {
    const resp = await methods.get("/form/forms");
    if (resp.status == "success") {
      return {
        status: true,
        data: resp.data,
      };
    }
    return {
      message: resp.message,
    };
  } catch (err) {
    console.log(err);
  }
};

const createForm = async ({ fields, title, desc }) => {
  try {
    // console.log(fields);
    const resp = await methods.post("/form/form-fields", {
      fields,
      title,
      desc,
    });
    console.log(resp);
  } catch (err) {
    console.log(err);
  }
};

const getPublicLink = async (name, orgName) => {
  try {
    const resp = await methods.post("/form/get-public-link", {
      name: name,
      orgName: orgName,
    });

    return resp.data.url;
  } catch (err) {
    console.log(err);
  }
};

const getPublicFormFields = async (key) => {
  const resp = await methods.get(`/public/form/${key}`);
  return resp;
};

const getResponses = async ({ key, page = 1, limit = 10 }) => {
  const resp = await methods.get(
    `/form/response/${key}?page=${page}&limit=${limit}`,
  );
  return resp;
};

const submitResponse = async (key, payload) => {
  try {
    const formData = new FormData();

    Object.keys(payload).forEach((field) => {
      const item = payload[field];
      const { key: label, value } = item;

      // ✅ FILE OR SIGNATURE
      if (value instanceof File || value instanceof Blob) {
        const fileName = value instanceof File ? value.name : `${label}.png`;

        // 1️⃣ send file
        formData.append(`file_${field}`, value, fileName);

        // 2️⃣ send metadata
        formData.append(
          `file_${field}_meta`,
          JSON.stringify({
            key: label,
            fileName,
          }),
        );
      } else {
        formData.append(field, JSON.stringify(item));
      }
    });

    const resp = await methods.post(`/public/form/${key}`, formData);
    return resp;
  } catch (err) {
    console.log(err);
  }
};

const fetchPublicForms = async ({ page, limit }) => {
  const resp = await methods.get(`/form/public?page=${page}&limit=${limit}`);
  return resp;
};

const createPublicForm = async ({ title, organization }) => {
  const resp = await methods.put(`/form/public`, { title, organization });
  return resp;
};

const getForm = async ({ title, organization }) => {
  const resp = await methods.get(`/form/${title}/${organization}`);
  return resp;
};

const updateForm = async ({ title, description, fields, initialname }) => {
  const resp = await methods.put("/form/update", {
    title: title,
    description: description,
    fields,
    initialname,
  });
  return resp;
};

const markFormAsArchive = async ({ title }) => {
  const resp = await methods.patch("/form/archive", { title });
  return resp;
};

const getAllArchiveForm = async () => {
  const resp = await methods.get("/form/archieved");
  return resp;
};

const getFavoriteForms = async () => {
  const resp = await methods.get("/form/favourite");
  return resp;
};

const markFormAsFavorite = async ({ title }) => {
  const resp = await methods.patch("/form/mark-as-favourite", { title });
  if (!resp.success) {
    showError(resp.message);
  } else {
    showSuccess(resp.message);
  }
  return resp;
};

const formsApi = {
  myforms,
  createForm,
  getPublicLink,
  getPublicFormFields,
  getResponses,
  submitResponse,
  fetchPublicForms,
  createPublicForm,
  getForm,
  updateForm,
  markFormAsArchive,
  getAllArchiveForm,
  getFavoriteForms,
  markFormAsFavorite,
};

export default formsApi;
