// controller/form.controller.js

import asyncErrorHandler from "../../utility/asyncErrorHandler.js";
import formService from "./form.service.js";

const createForm = asyncErrorHandler(async (req, res) => {
  const result = await formService.processCreateForm({
    name: req.body.name,
    organizationId: req.user.organizationId,
    createdBy: req.user._id
  });

  res.status(201).json({
    success: true,
    message: "Form created successfully.",
    data: result
  });
});

const addFileds = asyncErrorHandler(async (req, res) => {
  const result = await formService.processAddFields({
    formId: req.params.formId,
    fields: req.body.fields,
    updatedBy: req.user._id
  });

  res.status(200).json({
    success: true,
    message: "Fields added successfully.",
    data: result
  });
});

const formController = {
  createForm,
  addFileds
};

export default formController;