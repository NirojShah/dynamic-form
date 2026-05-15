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

const processGetResponseAnalytics = async ({ orgId, today }) => {
  try {
    // TODAY DATE
    const currentDate = today ? new Date(today) : new Date();

    // LAST 7 DAYS START
    const startDate = new Date(currentDate);
    startDate.setDate(currentDate.getDate() - 6);

    startDate.setHours(0, 0, 0, 0);

    // END OF TODAY
    const endDate = new Date(currentDate);
    endDate.setHours(23, 59, 59, 999);

    // FETCH FORM IDS
    const forms = await SchemaModel.find(
      {
        organizationId: new mongoose.Types.ObjectId(orgId),
      },
      {
        _id: 1,
      },
    );

    const formIds = forms.map((f) => f._id);

    const analytics = await SubmittedResponse.aggregate([
      {
        $match: {
          formId: {
            $in: formIds,
          },

          createdAt: {
            $gte: startDate,
            $lte: endDate,
          },
        },
      },

      {
        $group: {
          _id: {
            $dateToString: {
              format: "%Y-%m-%d",
              date: "$createdAt",
            },
          },

          responses: {
            $sum: 1,
          },
        },
      },

      {
        $sort: {
          _id: 1,
        },
      },
    ]);

    const finalData = [];

    for (let i = 6; i >= 0; i--) {
      const d = new Date(currentDate);

      d.setDate(currentDate.getDate() - i);

      const fullDate = d.toISOString().split("T")[0];

      const found = analytics.find((a) => a._id === fullDate);

      finalData.push({
        day: d.toLocaleDateString("en-US", {
          weekday: "short",
        }),

        date: fullDate,

        responses: found ? found.responses : 0,
      });
    }

    return {
      success: true,
      data: finalData,
    };
  } catch (error) {
    return {
      success: false,
      messge: error.message,
    };
  }
};

const processGetPerformance = async ({ orgId }) => {
  try {
    // TOTAL FORMS
    const totalForms = await SchemaModel.countDocuments({
      organizationId: new mongoose.Types.ObjectId(orgId),
    });

    // ACTIVE FORMS
    const activeForms = await SchemaModel.countDocuments({
      organizationId: new mongoose.Types.ObjectId(orgId),
      status: "active",
    });

    // GET FORM IDS
    const forms = await SchemaModel.find(
      {
        organizationId: new mongoose.Types.ObjectId(orgId),
      },
      {
        _id: 1,
        opened: 1,
      },
    );

    const formIds = forms.map((f) => f._id);

    // TOTAL RESPONSES
    const totalResponses = await SubmittedResponse.countDocuments({
      formId: {
        $in: formIds,
      },
    });

    // TOTAL FORM OPENS
    const totalFormViews = forms.reduce(
      (acc, curr) => acc + (curr.opened || 0),
      0,
    );

    // AVG RESPONSES / FORM
    const avgResponsesPerForm =
      totalForms > 0 ? (totalResponses / totalForms).toFixed(1) : 0;

    // ACTIVE FORM %
    const activeFormsPercentage =
      totalForms > 0 ? ((activeForms / totalForms) * 100).toFixed(0) : 0;

    // COMPLETION RATE
    const completionRate =
      totalFormViews > 0
        ? ((totalResponses / totalFormViews) * 100).toFixed(0)
        : 0;

    return {
      success: true,

      data: [
        {
          title: "Completion Rate",
          value: `${completionRate}%`,
        },

        {
          title: "Avg Responses / Form",
          value: avgResponsesPerForm,
        },

        {
          title: "Active Forms",
          value: `${activeFormsPercentage}%`,
        },
      ],
    };
  } catch (err) {
    return {
      success: false,
      message: err.message,
    };
  }
};

const processGetRecentResponse = async ({ orgId, limit = 5 }) => {
  try {
    const recentForms = await SubmittedResponse.aggregate([
      {
        $lookup: {
          from: "schemas",
          localField: "formId",
          foreignField: "_id",
          as: "formInfo",
        },
      },

      {
        $unwind: "$formInfo",
      },

      {
        $match: {
          "formInfo.organizationId": new mongoose.Types.ObjectId(orgId),
        },
      },

      {
        $project: {
          _id: 0,

          createdAt: 1,

          formName: "$formInfo.name",

          userName: {
            $concat: [
              {
                $ifNull: ["$userResponse.First Name", ""],
              },
              " ",
              {
                $ifNull: ["$userResponse.Last Name", ""],
              },
            ],
          },
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
          organizationId: new mongoose.Types.ObjectId(orgId),
        },
      },
      {
        $lookup: {
          from: "userresponses",
          localField: "_id",
          foreignField: "formId",
          as: "responses",
        },
      },
      {
        $addFields: {
          totalResponse: { $size: "$responses" },
        },
      },
      {
        $project: {
          fields: 0,
          responses: 0,
          organizationid: 0,
          createdBy: 0,
          updatedAt: 0,
          _id: 0,
          __v: 0,
          updatedBy: 0,
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
