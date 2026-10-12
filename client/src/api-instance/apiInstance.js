import { showError, showSuccess } from "../notification/notification.service";

const BASE_URL = import.meta.env.VITE_FORMS_API;

const buildHeaders = (isFormData = false) => {
  const token = localStorage.getItem("token");

  return {
    ...( !isFormData && { "Content-Type": "application/json" }),
    ...(token && {
      Authorization: `Bearer ${token}`,
    }),
  };
};

const commonConfig = {
  credentials: "include",
};

const parseResponse = async (res) => {
  const contentType = res.headers.get("content-type");

  if (contentType && contentType.includes("application/json")) {
    return await res.json();
  }

  return {};
};

const handleResponse = async (res) => {
  let data = {};

  try {
    data = await parseResponse(res);
  } catch (error) {
    data = { message: error.message };
  }

  if (!res.ok) {
    const message = data?.message || "Something went wrong";

    showError(message);

    throw {
      status: res.status,
      message,
      data,
    };
  }

  return data;
};

const request = async (endpoint, method = "GET", body = null) => {
  const isFormData = body instanceof FormData;

  const config = {
    method,
    headers: buildHeaders(isFormData),
    ...commonConfig,
  };

  if (body) {
    config.body = isFormData ? body : JSON.stringify(body);
  }

  const res = await fetch(`${BASE_URL}${endpoint}`, config);

  return handleResponse(res);
};

const get = (endpoint) => request(endpoint, "GET");
const post = (endpoint, body = {}) => request(endpoint, "POST", body);
const put = (endpoint, body = {}) => request(endpoint, "PUT", body);
const patch = (endpoint, body = {}) => request(endpoint, "PATCH", body);
const del = (endpoint) => request(endpoint, "DELETE");

const postWithSuccess = async (
  endpoint,
  body = {},
  successMessage = "Success",
) => {
  const data = await post(endpoint, body);
  showSuccess(successMessage);
  return data;
};

export default {
  get,
  post,
  put,
  patch,
  del,
  postWithSuccess,
};
