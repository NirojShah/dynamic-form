import { Router } from "express";
import formRoute from "../module/form/form.route.js";
import userRoute from "../module/user/user.route.js";
import orgRouter from "../module/organization/organization.route.js";

const applicationRouter = Router();

applicationRouter.use(formRoute)
applicationRouter.use(userRoute)
applicationRouter.use(orgRouter)


export default applicationRouter;