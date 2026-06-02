import redisServices from "../../redis/redis.service.js";
import asyncErrorHandler from "../../utility/asyncErrorHandler.js";
import CustomError from "../../utility/customError.js";
import formDataService from "../form-data/form.data.service.js";
import validatedUserResponse from "../form-data/form.data.validation.js";
import SchemaModel from "../form/form.model.js";
import formUtility from "../form/form.utility.js";
import publicFormService from "./public.form.service.js";
import parseFormPayload from "./public.form.utility.js";

const getPublicForm = asyncErrorHandler(async (req, res) => {
  const { key } = req.params;
  const cacheMem = await redisServices.processGetValue(key);
  if (cacheMem) {
    return res.status(200).json({
      success: true,
      data: cacheMem,
    });
  }
  const resp = await publicFormService.processGetPublicForm({ key });

  await redisServices.processSetValue({ key, value: resp.data, ttlSec: 36000 });

  if (resp.success) {
    return res.status(200).json({
      success: true,
      data: resp.data,
    });
  }
  return res.status(500).json({
    success: true,
    message: resp.message,
  });
});

const handleUploadUploadUserData = asyncErrorHandler(async (req, res) => {
  const { key } = req.params;

  const dataArray = parseFormPayload(req.body, req.files);

  const formId = formUtility.decrypter(key);
  const form = await SchemaModel.findById(formId);
  if (!form) {
    return res.status(404).json({ status: false, message: "Form not found." });
  }

  const validation = validatedUserResponse(dataArray, form.fields);
  if (!validation.success) {
    return res.status(400).json({ status: false, message: validation.message });
  }

  const resp = await formDataService.processUploadResponse({
    formId,
    data: dataArray,
    orgId: form.organizationId,
  });

  if (resp.success) {
    return res.status(201).json({
      success: true,
      message: "Form submitted successfully.",
    });
  }

  throw new CustomError(500, "Something went wrong while saving the response.");
});

const publicFormController = {
  getPublicForm,
  handleUploadUploadUserData,
};

export default publicFormController;
