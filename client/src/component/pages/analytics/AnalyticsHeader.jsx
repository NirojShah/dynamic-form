import React from "react";
import { useNavigate } from "react-router-dom";

const AnalyticsHeader = () => {
    const navigate = useNavigate();
    return (
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
            <div>
                <h1 className="text-3xl font-bold text-[#0E0F0C]">
                    Dashboard
                </h1>

                <p className="text-sm text-gray-500 mt-1">
                    Monitor your forms, responses and workspace activity.
                </p>
            </div>

            <div className="flex items-center gap-3 mt-4 md:mt-0">
                <button className="px-4 py-2 rounded-xl border border-black/10 bg-white text-sm hover:bg-black/5">
                    Export Report
                </button>

                <button className="px-4 py-2 rounded-xl bg-[#9FE870] text-[#163300] text-sm font-medium hover:opacity-90"
                    onClick={() => {
                        navigate("/home/create-form")
                    }}
                >
                    + Create Form
                </button>
            </div>
        </div>
    );
};

export default AnalyticsHeader;