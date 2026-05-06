import express from "express";
import formController from "./form.controller.js";

const formRoute = express.Router();

formRoute.post("/create", formController.createForm);
formRoute.post("/create-fields", formController.addFileds);
formRoute.get("/forms", formController.getAllforms);
formRoute.get("/form-detail/:formId", formController.getformInDetail);
formRoute.post("/form-fields", formController.createFormWithFields);
formRoute.post("/get-public-link", formController.generatePublicLink);
formRoute.get("/response/:key", formController.getResponse);

export default formRoute;
