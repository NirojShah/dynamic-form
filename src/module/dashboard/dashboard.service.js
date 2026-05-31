import mongoose from "mongoose";
import SchemaModel from "../form/form.model.js";
import SubmittedResponse from "../form-data/form.data.model.js";

const processDashboardCards = async ({ orgId }) => {
  try {
    const objectOrgId = new mongoose.Types.ObjectId(orgId);

    const totalForms = await SchemaModel.countDocuments({
      organizationId: objectOrgId,
    });

    const totalResponses = await SchemaModel.aggregate([
      {
        $match: {
          organizationId: objectOrgId,
        },
      },
      {
        $group: {
          _id: null,
          totalResponses: {
            $sum: "$responseCount",
          },
        },
      },
      {
        $project: {
          _id: 0,
          totalResponses: 1,
        },
      },
    ]);

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

    const headers = [
      { label: "Total Forms", value: totalForms },
      { label: "Responses", value: totalResponses[0].totalResponses },
      { label: "Active Forms", value: activeForms },
      // { label: "Total Opened", value: totalOpened },
      {
        label: "Conversion",
        value:
          totalOpened > 0
            ? `${((totalResponses[0].totalResponses / totalOpened) * 100).toFixed(2)}%`
            : 0,
      },
    ];

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
    // TODAY
    const currentDate = today ? new Date(today) : new Date();

    // LAST 7 DAYS START
    const startDate = new Date(currentDate);
    startDate.setDate(currentDate.getDate() - 6);
    startDate.setHours(0, 0, 0, 0);

    // TODAY END
    const endDate = new Date(currentDate);
    endDate.setHours(23, 59, 59, 999);

    // FETCH FORMS
    const forms = await SchemaModel.find(
      {
        organizationId: new mongoose.Types.ObjectId(orgId),
      },
      {
        _id: 1,
      },
    ).lean();

    // RUN AGGREGATION ON ALL FORM COLLECTIONS
    const results = await Promise.all(
      forms.map(async (form) => {
        const collectionName = `${form._id}-${orgId}`;

        // skip if collection not created yet
        const exists = await mongoose.connection.db
          .listCollections({
            name: collectionName,
          })
          .toArray();

        if (!exists.length) return [];

        const ResponseModel =
          mongoose.models[collectionName] ||
          mongoose.model(
            collectionName,
            new mongoose.Schema(
              {},
              {
                strict: false,
                timestamps: true,
              },
            ),
            collectionName,
          );

        return ResponseModel.aggregate([
          {
            $match: {
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
        ]);
      }),
    );

    // MERGE ALL COLLECTION RESULTS
    const merged = {};

    results.flat().forEach((item) => {
      if (!merged[item._id]) {
        merged[item._id] = 0;
      }

      merged[item._id] += item.responses;
    });

    // BUILD 7 DAY DATA
    const finalData = [];

    for (let i = 6; i >= 0; i--) {
      const d = new Date(currentDate);
      d.setDate(currentDate.getDate() - i);

      const fullDate = d.toISOString().split("T")[0];

      finalData.push({
        day: d.toLocaleDateString("en-US", {
          weekday: "short",
        }),
        date: fullDate,
        responses: merged[fullDate] || 0,
      });
    }

    return {
      success: true,
      data: finalData,
    };
  } catch (error) {
    return {
      success: false,
      message: error.message,
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

    // TOTAL RESPONSES
    const totalResponses = await SchemaModel.aggregate([
      {
        $match: {
          organizationId: new mongoose.Types.ObjectId(orgId),
        },
      },
      {
        $group: {
          _id: null,
          totalResponses: {
            $sum: "$responseCount",
          },
          totalViews: {
            $sum: "$opened",
          },
        },
      },
    ]);

    // TOTAL FORM OPENS
    const totalFormViews = totalResponses[0].totalViews;

    // AVG RESPONSES / FORM
    const avgResponsesPerForm =
      totalForms > 0
        ? (totalResponses[0].totalResponses / totalForms).toFixed(1)
        : 0;

    // ACTIVE FORM %
    const activeFormsPercentage =
      totalForms > 0 ? ((activeForms / totalForms) * 100).toFixed(0) : 0;

    // COMPLETION RATE
    const completionRate =
      totalFormViews > 0
        ? ((totalResponses[0].totalResponses / totalFormViews) * 100).toFixed(0)
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
    // FETCH ORG FORMS
    const forms = await SchemaModel.find(
      {
        organizationId: new mongoose.Types.ObjectId(orgId),
      },
      {
        _id: 1,
        name: 1,
      },
    ).lean();

    // FETCH RESPONSES FROM ALL FORM COLLECTIONS
    const results = await Promise.all(
      forms.map(async (form) => {
        const collectionName = `${form._id}-${orgId}`;

        // CHECK COLLECTION EXISTS
        const exists = await mongoose.connection.db
          .listCollections({
            name: collectionName,
          })
          .toArray();

        if (!exists.length) return [];

        // REUSE MODEL
        const ResponseModel =
          mongoose.models[collectionName] ||
          mongoose.model(
            collectionName,
            new mongoose.Schema(
              {},
              {
                strict: false,
                timestamps: true,
              },
            ),
            collectionName,
          );

        const responses = await ResponseModel.aggregate([
          {
            $project: {
              _id: 1,
              createdAt: 1,

              user: {
                $trim: {
                  input: {
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

        // ATTACH FORM NAME
        return responses.map((r) => ({
          ...r,
          form: form.name,
        }));
      }),
    );

    // MERGE + GLOBAL SORT
    const recentForms = results
      .flat()
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, limit);

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
          name: "$name",
          id: "$_id",
          responses: "$totalResponse",
          status: "$status",
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
