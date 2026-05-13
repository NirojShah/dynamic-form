import { Router } from "express";
import dashboardController from "./dashboard.controller.js";

const dashboardRoute = Router();

dashboardRoute.get("/cards", dashboardController.dashboardCards);
dashboardRoute.get("/response-analytics", dashboardController.dashboardResponseAnalytics,);
dashboardRoute.get("/performance", dashboardController.dashboardPerformance);
dashboardRoute.get("/recent-responses", dashboardController.dashboardRecentResponse);
dashboardRoute.get("/recent-forms", dashboardController.dashboardRecentforms);

export default dashboardRoute;
