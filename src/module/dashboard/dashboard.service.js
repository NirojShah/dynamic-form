import mongoose from "mongoose";
import SchemaModel from "../form/form.model";

const processDashboardCards = async ({ orgId, start, end }) => {
  try {
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

const dashboardService = {
  processDashboardCards,
};

export default dashboardService;
