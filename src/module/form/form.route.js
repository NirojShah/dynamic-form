import express from "express";
import formController from "./form.controller.js";

const formRoute = express.Router();

formRoute.post("/create", formController.createForm);
formRoute.post("/create-fields", formController.addFileds);
formRoute.get("/forms", formController.getAllforms);
formRoute.get("/form-detail/:key", formController.getformInDetail);
formRoute.post("/form-fields", formController.createFormWithFields);
formRoute.post("/get-public-link", formController.generatePublicLink);
formRoute.get("/response/:key", formController.getResponse);
formRoute.delete("/:key", formController.deleteForm);
formRoute.get("/public", formController.getPublicForms);
formRoute.put("/public", formController.createPublicForm);

export default formRoute;
