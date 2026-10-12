import React, { useEffect, useState } from "react";

import AnalyticsHeader from "./AnalyticsHeader";
import AnalyticsStats from "./AnalyticsStats";
import AnalyticsCharts from "./AnalyticsCharts";
import RecentForms from "./RecentForms";
import RecentResponses from "./RecentResponses";
import QuickActions from "./QuickActions";
import analyticsApis from "../../../utility/analytics.api";

const Analytics = () => {
    const [stats, setStats] = useState([]);
    const [chartData, setChartData] = useState([]);
    const [responses, setResponses] = useState([]);
    const [forms, setforms] = useState([]);
    const [performance, setPerformance] = useState([]);

    const fetchAnalysisData = async () => {
        try {
            const [
                statsResult,
                formResult,
                responseResult,
                chartResult,
                performanceResult,
            ] = await Promise.allSettled([
                analyticsApis.fetchStats(),
                analyticsApis.fetchFormInfos(),
                analyticsApis.fetchResponseInfos(),
                analyticsApis.fetchChartInfos(),
                analyticsApis.fetchPerformance(),
            ]);

            if (
                statsResult.status === "fulfilled" &&
                statsResult.value.success
            ) {
                setStats(statsResult.value.data.headers);
            }

            if (
                chartResult.status === "fulfilled" &&
                chartResult.value.success
            ) {
                setChartData(chartResult.value.data);
            }

            if (
                responseResult.status === "fulfilled" &&
                responseResult.value.success
            ) {
                setResponses(responseResult.value.data);
            }

            if (
                formResult.status === "fulfilled" &&
                formResult.value.success
            ) {
                setforms(formResult.value.data);
            }

            if (
                performanceResult.status === "fulfilled" &&
                performanceResult.value.success
            ) {
                setPerformance(performanceResult.value.data);
            }
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        fetchAnalysisData();
    }, []);

    return (
        <div className="min-h-screen bg-[#f7f8f5] p-6">
            <AnalyticsHeader />

            <AnalyticsStats stats={stats} />

            <AnalyticsCharts
                chartData={chartData}
                perfomance={performance}
            />

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mt-6">
                <RecentForms forms={forms} />
                <RecentResponses responses={responses} />
            </div>

            <QuickActions />
        </div>
    );
};

export default Analytics;