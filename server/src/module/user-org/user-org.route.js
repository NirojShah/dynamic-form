import { Router } from "express";
import userOrgController from "./user-org.controller.js";

const userorgRouter = Router();

userorgRouter.post("/create", userOrgController.userOrgCreate);

export default userorgRouter;
