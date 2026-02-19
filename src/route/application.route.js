import { Router } from "express";
import formRoute from "../module/form/form.route.js";

const applicationRouter = Router();

applicationRouter.use(formRoute)


export default applicationRouter;