import methods from "../api-instance/apiInstance";

const fetchStats = async () => {
  const resp = await methods.get("/analytics/cards");
  return resp;
};

const fetchChartInfos = async () => {
  const resp = await methods.get("/analytics/response-analytics");
  return resp;
};

const fetchFormInfos = async () => {
  const resp = await methods.get("/analytics/recent-forms");
  return resp;
};

const fetchResponseInfos = async () => {
  const resp = await methods.get("/analytics/recent-responses");
  return resp;
};

const fetchPerformance = async () => {
  const resp = await methods.get("/analytics/performance");
  return resp;
};

const analyticsApis = {
  fetchStats,
  fetchFormInfos,
  fetchResponseInfos,
  fetchChartInfos,
  fetchPerformance,
};

export default analyticsApis;
