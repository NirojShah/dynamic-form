import express from "express";
import formController from "./form.controller.js";

const formRoute = express.Router();

formRoute.post("/create", formController.createForm);
formRoute.post("/create-fields", formController.addFileds);
formRoute.get("/forms", formController.getAllforms);
formRoute.get("/form-detail/:formId", formController.getformInDetail);

export default formRoute;
