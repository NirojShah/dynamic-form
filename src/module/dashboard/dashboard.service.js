import mongoose from "mongoose";
import SchemaModel from "../form/form.model.js";
import SubmittedResponse from "../form-data/form.data.model.js";

const processDashboardCards = async ({ orgId }) => {
  try {
    const objectOrgId = new mongoose.Types.ObjectId(orgId);

    const totalForms = await SchemaModel.countDocuments({
      organizationId: objectOrgId,
    });

    const formIds = await SchemaModel.find(
      { organizationId: objectOrgId },
      { _id: 1 },
    ).lean();

    const filterFormIds = formIds.map((val) => val._id);

    const totalResponses = await SubmittedResponse.countDocuments({
      formId: { $in: filterFormIds },
    });

    const activeForms = await SchemaModel.countDocuments({
      organizationId: objectOrgId,
      status: "active",
    });

    const formOpenedResult = await SchemaModel.aggregate([
      {
        $match: {
          organizationId: objectOrgId,
          status: "active",
        },
      },
      {
        $group: {
          _id: null,
          totalOpened: { $sum: "$opened" },
        },
      },
    ]);

    const totalOpened = formOpenedResult[0]?.totalOpened || 0;

    const headers = {
      totalForms,
      totalResponses,
      activeForms,
      totalOpened,
      conversion: totalOpened > 0 ? (totalResponses / totalOpened) * 100 : 0,
    };

    return {
      success: true,
      data: {
        headers,
      },
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

const processGetRecentResponse = async ({ orgId, limit = 5 }) => {
  try {
    const recentResp = await SchemaModel.aggregate([
      {
        $match: {
          organizationId: orgId,
        },
      },
      {
        $project: {
          _id: 1,
        },
      },
    ]);

    const formIds = recentResp.map((val) => val._id);

    const recentForms = await SubmittedResponse.aggregate([
      {
        $match: {
          formId: {
            $in: formIds,
          },
        },
      },
      {
        $sort: {
          createdAt: -1,
        },
      },
      {
        $limit: 5,
      },
    ]);

    return {
      success: true,
      data: recentForms,
    };
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
          createdAt: -1,
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
