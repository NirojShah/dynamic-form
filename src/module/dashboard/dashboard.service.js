import mongoose from "mongoose";
import SchemaModel from "../form/form.model";

const processDashboardCards = async ({ orgId, start, end }) => {
  try {
    console.log(start, end);
    const totalForms = await SchemaModel.countDocuments({
      organizationId: new mongoose.Types.ObjectId(orgId),
    });

    return {
      success: true,
      totalforms: totalForms,
    };
  } catch (err) {
    return {
      success: false,
      message: err.message,
    };
  }
};

const processGetResponseAnalytics = async ({ orgId, start, end }) => {
  try {
    console.log(orgId, start, end);
  } catch (error) {
    return {
      success: false,
      messge: error.message,
    };
  }
};

const processGetPerformance = async ({ orgId, start, end }) => {
  try {
    console.log(orgId, start, end);
  } catch (err) {
    return {
      success: false,
      message: err.message,
    };
  }
};

const processGetRecentResponse = async ({ orgId, start, end }) => {
  try {
    console.log(orgId, start, end);
  } catch (err) {
    return {
      success: false,
      message: err.message,
    };
  }
};

const processGetRecentForms = async ({ orgId, limit = 5 }) => {
  try {
    const forms = await SchemaModel.aggregate([
      {
        $match: {
          organizationId: orgId,
        },
      },
      {
        $sort: {
          createdAt: 1,
        },
      },
      {
        $limit: limit,
      },
    ]);

    return {
      success: true,
      data: forms,
    };
  } catch (err) {
    return {
      success: false,
      message: err.message,
    };
  }
};

const dashboardService = {
  processDashboardCards,
  processGetResponseAnalytics,
  processGetPerformance,
  processGetRecentResponse,
  processGetRecentForms,
};

export default dashboardService;
