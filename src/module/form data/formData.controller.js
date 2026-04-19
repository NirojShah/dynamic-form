import asyncErrorHandler from "../../utility/asyncErrorHandler.js";
import CustomError from "../../utility/customError.js";
import SchemaModel from "../form/form.model.js";

const uploadData = asyncErrorHandler(async (req, res) => {
  const { formId, data } = req.body;
  if (!formId) {
    throw new CustomError(500, "formId is required.");
  }
  const formExists = await SchemaModel.findById(formId);

  if (!formExists) {
    throw new CustomError(500, "Invalid form id.");
  }

  const organizationId = formExists.organizationId;

  //   CONTINUE..
});

const fetchUploadedFormData = asyncErrorHandler(async (req, res) => {
  const { formId } = req.params;
  // CONTINUE.
});

const fetchFilteredUploadedFormData = asyncErrorHandler(async (req, res) => {});

const formDataController = {
  uploadData,
  fetchUploadedFormData,
  fetchFilteredUploadedFormData,
};

export default formDataController;
