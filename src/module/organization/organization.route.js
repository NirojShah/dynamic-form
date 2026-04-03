import { Router } from "express";
import organizationService from "./organization.service.js";

const orgRouter = Router()

orgRouter.post("/create-org",organizationService.processCreateOrg);
orgRouter.put("/update-org",organizationService.processUpdateOrg);

export default orgRouter;