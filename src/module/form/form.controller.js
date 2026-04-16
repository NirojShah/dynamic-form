// controller/form.controller.js

import asyncErrorHandler from "../../utility/asyncErrorHandler.js";
import CustomError from "../../utility/customError.js";
import formService from "./form.service.js";

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

const addFileds = asyncErrorHandler(async (req, res) => {
  const { fields, formId } = req.body;
  const userId = req.user._id;

  console.log({ fields, formId, userId });

  throw new CustomError(500, "EHHH BOIII..");

  const result = await formService.processAddFields({
    formId: req.params.formId,
    fields: req.body.fields,
    updatedBy: req.user._id,
  });

  res.status(200).json({
    success: true,
    message: "Fields added successfully.",
    data: result,
  });
});

const getAllforms = asyncErrorHandler(async (req, res) => {
  const resp = await formService.processAllForms();
  if (resp.success) {
    return res.status(200).json({
      status: "success",
      forms: resp.data,
    });
  }
  throw new CustomError(500, resp.message);
});

const formController = {
  createForm,
  addFileds,
  getAllforms,
};

export default formController;
