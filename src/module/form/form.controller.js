// controller/form.controller.js

import asyncErrorHandler from "../../utility/asyncErrorHandler.js";
import CustomError from "../../utility/customError.js";
import formDataService from "../form-data/form.data.service.js";
import formService from "./form.service.js";
import formUtility from "./form.utility.js";
import checkFormFields from "./form.validation.js";

const createForm = asyncErrorHandler(async (req, res) => {
  const { name, organizationId } = req.body;
  const result = await formService.processCreateForm({
    name: name,
    organizationId: organizationId,
    createdBy: req.user.userId,
  });

  res.status(201).json({
    success: true,
    message: "Form created successfully.",
    data: result,
  });
});

const createFormWithFields = asyncErrorHandler(async (req, res) => {
  const { fields, title, desc } = req.body;

  const resp = await formService.createFormWithfields({
    desc,
    title,
    fields,
    orgId: req.user.organizationId,
    userId: req.user.userId,
  });

  if (resp.success) {
    return res.status(200).json({
      success: true,
      message: "form created successfully.",
    });
  }
  return res.status(500).json({
    success: false,
    message: resp.message,
  });
});

const addFileds = asyncErrorHandler(async (req, res) => {
  const { fields, formId } = req.body;
  const userId = req.user.userId;

  const filteredFields = checkFormFields(fields);

  if (!filteredFields.success) {
    throw new CustomError(500, filteredFields.message);
  }

  const result = await formService.processAddFields({
    formId: formId,
    fields: filteredFields.fields,
    updatedBy: userId,
  });

  res.status(200).json({
    success: true,
    message: "Fields added successfully.",
    data: result,
  });
});

const getAllforms = asyncErrorHandler(async (req, res) => {
  const orgainzationId = req.user.organizationId;
  const resp = await formService.processAllForms();
  if (resp.success) {
    return res.status(200).json({
      status: "success",
      data: resp.data,
    });
  }
  throw new CustomError(500, resp.message);
});

const getformInDetail = asyncErrorHandler(async (req, res) => {
  const { formId } = req.params;
  const resp = await formService.processGetFormDetail({ formId });
  if (resp.success) {
    return res.status(200).json({
      status: "success",
      data: resp.data,
    });
  }

  return res.status(50).json({
    status: "failed",
    message: resp.message,
  });
});

const generatePublicLink = asyncErrorHandler(async (req, res) => {
  const { name, orgName } = req.body;
  const resp = await formService.processGeneratePublicLink({
    name,
    organizationName: orgName,
  });
  if (resp.success) {
    return res.status(200).json({
      success: true,
      data: resp.data,
    });
  }

  return res.status(500).json({
    success: false,
    message: resp.message,
  });
});

const getResponse = asyncErrorHandler(async (req, res) => {
  const { page, limit } = req.query;
  const { key } = req.params;

  if (!key) {
    return res
      .status(400)
      .json({ success: false, message: "Key is required." });
  }

  const formId = formUtility.decrypter(key);

  const resp = await formDataService.processGetUserResponse(
    formId,
    page,
    limit,
  );

  if (resp.success) {
    return res.status(200).json({
      success: true,
      message: "Responses fetched successfully.",
      fields: resp.fields,
      data: resp.data,
      pagination: resp.pagination,
    });
  }

  return res.status(500).json({ success: false, message: resp.message });
});

const formController = {
  createForm,
  addFileds,
  getAllforms,
  getformInDetail,
  createFormWithFields,
  generatePublicLink,
  getResponse,
};

export default formController;
