import express from "express";
import formController from "./form.controller.js";

const formRoute = express.Router();

formRoute.post("/create", formController.createForm);
formRoute.post("/create-fields", formController.addFileds);
formRoute.get("/forms", formController.getAllforms);
formRoute.post("/form-fields", formController.createFormWithFields);
formRoute.post("/get-public-link", formController.generatePublicLink);
formRoute.get("/response/:key", formController.getResponse);
formRoute.delete("/:key", formController.deleteForm);
formRoute.get("/public", formController.getPublicForms);
formRoute.put("/public", formController.createPublicForm);
formRoute.get("/:formName/:organization", formController.getformInDetail);
formRoute.put("/update", formController.updateForm);
formRoute.get("/archieved", formController.archievedForms);
formRoute.patch("/archive", formController.markAsArchieved);

export default formRoute;
