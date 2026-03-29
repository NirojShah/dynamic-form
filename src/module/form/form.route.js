import express from "express";
import formController from "./form.controller.js";

const formRoute = express.Router();

formRoute.post("/create", formController.createForm);
formRoute.post("/create-fields", formController.addFileds);

export default formRoute;
