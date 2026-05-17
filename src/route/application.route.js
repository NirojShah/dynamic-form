import { Router } from "express";
import formRoute from "../module/form/form.route.js";
import userRoute from "../module/user/user.route.js";
import orgRouter from "../module/organization/organization.route.js";
import verifyToken from "../middleware/auth.middleware.js";
import publicFormRoute from "../module/public-form-route/public.form.route.js";
import dashboardRoute from "../module/dashboard/dashboard.route.js";
import userorgRouter from "../module/user-org/user-org.route.js";

const applicationRouter = Router();
applicationRouter.use("/user", userRoute);
applicationRouter.use("/public", publicFormRoute);
applicationRouter.use(verifyToken);
applicationRouter.use("/form", formRoute);
applicationRouter.use("/org", orgRouter);
applicationRouter.use("/analytics", dashboardRoute);
applicationRouter.use("/user-org", userorgRouter);

export default applicationRouter;
