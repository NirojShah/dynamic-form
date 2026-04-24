import asyncErrorHandler from "../../utility/asyncErrorHandler.js";
import CustomError from "../../utility/customError.js";
import SchemaModel from "../form/form.model.js";
import formDataService from "./formData.service.js";
import validateFormData from "./formData.validation.js";

const uploadData = asyncErrorHandler(async (req, res) => {
  const { formId, data, submittedBy } = req.body;

  if (!submittedBy || !submittedBy.contains("@")) {
    return res.status(404).json({
      status: "failed",
      message: "Please share you email.",
    });
  }

  if (!formId) {
    throw new CustomError(400, "formId is required.");
  }

  const formExists = await SchemaModel.findById(formId);

  if (!formExists) {
    throw new CustomError(404, "Invalid form id.");
  }

  const formDataValidation = await validateFormData({
    formFields: formExists.fields,
    data,
  });

  if (!formDataValidation.success) {
    return res.status(400).json({
      status: "failed",
      errors: formDataValidation.errors,
    });
  }

  const submittedData = await formDataService.processUploadData({
    formData: formDataValidation,
    formId,
    organizationId: formExists.organizationId,
    submittedBy: submittedBy,
  });

  if (submittedData.success) {
    return res.status(200).json({
      status: "success",
      message: "form submitted successfully.",
    });
  }

  throw new CustomError(500, submittedData.message);
});

const fetchUploadedFormData = asyncErrorHandler(async (req, res) => {
  const { formId } = req.params;
  const { page, limit } = req.query;
  const formData = await formDataService.processGetFormData({
    page,
    limit,
    formId,
  });

  if (formData.success) {
    return res.status(200).json({
      status: "success",
      data: formData.data,
      pagination: formData.pagination,
    });
  }

  return res.satus(500).json({
    status: "faiiled",
    message: formData.message,
  });
});

const fetchFilteredUploadedFormData = asyncErrorHandler(async () => {});

const formDataController = {
  uploadData,
  fetchUploadedFormData,
  fetchFilteredUploadedFormData,
};

export default formDataController;
