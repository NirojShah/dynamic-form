import React from "react";
import {
    ResponsiveContainer,
    AreaChart,
    Area,
    XAxis,
    Tooltip,
} from "recharts";

const AnalyticsCharts = ({ chartData, perfomance }) => {
    return (
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mt-6">
            {/* MAIN CHART */}
            <div className="xl:col-span-2 bg-white border border-black/10 rounded-2xl p-5">
                <div className="mb-5">
                    <h2 className="text-lg font-semibold">
                        Response Analytics
                    </h2>

                    <p className="text-sm text-gray-500">
                        Weekly response activity
                    </p>
                </div>

                <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={chartData}>
                            <XAxis dataKey="day" />

                            <Tooltip />

                            <Area
                                type="monotone"
                                dataKey="responses"
                                stroke="#163300"
                                fill="#9FE870"
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* SIDE CARD */}
            <div className="bg-white border border-black/10 rounded-2xl p-5">
                <h2 className="text-lg font-semibold mb-5">
                    Performance
                </h2>

                <div className="space-y-5">
                    {
                        perfomance.map((val, key) => {
                            const percentage = parseFloat(val.value)
                            return (
                                <div key={val.title + key}>
                                    <div className="flex justify-between text-sm mb-2">
                                        <span>{val.title}</span>
                                        <span>{val.value}</span>
                                    </div>

                                    <div className="h-2 rounded-full bg-gray-200 overflow-hidden">
                                        <div
                                            className="h-full bg-[#9FE870]"
                                            style={{ width: `${percentage}%` }}
                                        />
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    );
};

export default AnalyticsCharts;