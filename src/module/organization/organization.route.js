import { Router } from "express";
import orgController from "./organization.controller.js";

const orgRouter = Router()

orgRouter.post("/create-org",orgController.createOrganization);
orgRouter.put("/update-org",orgController.updateOrganizaton);
orgRouter.get("/",orgController.getAllOrganization)

export default orgRouter;