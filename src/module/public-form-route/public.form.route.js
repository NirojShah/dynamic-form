import { Router } from "express";
import publicFormController from "./public.form.controller.js";

const publicFormRoute = Router();

publicFormRoute.get("/form/:key", publicFormController.getPublicForm);
publicFormRoute.post(
  "/form/:key",
  publicFormController.handleUploadUploadUserData,
);

export default publicFormRoute;
