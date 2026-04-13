import { Router } from "express";
import formRoute from "../module/form/form.route.js";
import userRoute from "../module/user/user.route.js";
import orgRouter from "../module/organization/organization.route.js";
import verifyToken from "../middleware/auth.middleware.js";

const applicationRouter = Router();

applicationRouter.use("/user",userRoute)
applicationRouter.use(verifyToken)
applicationRouter.use("/form",formRoute)
applicationRouter.use("/org",orgRouter)


export default applicationRouter;