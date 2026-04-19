import { Router } from "express";
import formDataController from "./formData.controller.js";

const formDataRouter = Router();

formDataRouter.post("/", formDataController.uploadData);
formDataRouter.get("/", formDataController.fetchUploadedFormData);
formDataRouter.get(
  "/filtered",
  formDataController.fetchFilteredUploadedFormData,
);

export default formDataRouter;
