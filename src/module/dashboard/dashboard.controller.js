import asyncErrorHandler from "../../utility/asyncErrorHandler.js";
import CustomError from "../../utility/customError.js";
import dashboardService from "./dashboard.service.js";

const dashboardCards = asyncErrorHandler(async (req, res) => {
  const orgId = req.user.organizationId;
  const resp = await dashboardService.processDashboardCards({ orgId });
  if (resp.success) {
    return res.status(200).json({
      success: true,
      data: resp.data,
    });
  }
  return res.status(500).json({
    success: false,
    message: resp.message,
  });
});

const dashboardResponseAnalytics = asyncErrorHandler(async (req, res) => {
  const organizationId = req.user.organizationId;

  const today = new Date();

  const resp = await dashboardService.processGetResponseAnalytics({
    orgId: organizationId,
    today,
  });

  if (resp.success) {
    return res.status(200).json({
      success: true,
      data: resp.data,
    });
  }

  return res.status(500).json({
    success: false,
    message: resp.messge,
  });
});

const dashboardPerformance = asyncErrorHandler(async (req, res) => {});

const dashboardRecentforms = asyncErrorHandler(async (req, res) => {
  const orgId = req.user.organizationId;
  const limit = req.query.limit && 5;
  const resp = await dashboardService.processGetRecentForms({ orgId, limit });

  if (resp.success) {
    return res.status(200).json({
      success: true,
      data: resp.data,
    });
  }
  throw new CustomError(500, resp.message);
});

const dashboardRecentResponse = asyncErrorHandler(async (req, res) => {
  const { limit } = req.query && 5;
  const orgId = req.user.organizationId;
  const resp = await dashboardService.processGetRecentResponse({
    orgId,
    limit,
  });
  if (resp.success) {
    return res.status(200).json({
      success: true,
      data: resp.data,
    });
  }
  throw new CustomError(500, resp.message);
});

const dashboardController = {
  dashboardCards,
  dashboardResponseAnalytics,
  dashboardPerformance,
  dashboardRecentResponse,
  dashboardRecentforms,
};

export default dashboardController;
