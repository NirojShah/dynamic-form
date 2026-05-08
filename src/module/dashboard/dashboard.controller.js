import asyncErrorHandler from "../../utility/asyncErrorHandler.js";

const dashboardCards = asyncErrorHandler(async (req, res) => {});

const dashboardResponseAnalytics = asyncErrorHandler(async (req, res) => {});

const dashboardPerformance = asyncErrorHandler(async (req, res) => {});

const dashboardRecentforms = asyncErrorHandler(async (req, res) => {});

const dashboardRecentResponse = asyncErrorHandler(async (req, res) => {});

const dashboardController = {
  dashboardCards,
  dashboardResponseAnalytics,
  dashboardPerformance,
  dashboardRecentResponse,
  dashboardRecentforms,
};

export default dashboardController;
