import React from "react";
import {
  FileText,
  BarChart3,
  Activity,
  TrendingUp,
} from "lucide-react";

const icons = [
  <FileText size={20} />,
  <BarChart3 size={20} />,
  <Activity size={20} />,
  <TrendingUp size={20} />,
];

const AnalyticsStats = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
      {stats.map((item, i) => (
        <div
          key={i}
          className="
            bg-white
            border border-black/10
            rounded-2xl
            p-5
            shadow-sm
          "
        >
          <div className="flex items-center justify-between">
            <div className="w-11 h-11 rounded-xl bg-[#163300]/10 flex items-center justify-center text-[#163300]">
              {icons[i]}
            </div>

            <span className="text-xs font-medium text-green-600">
              {item.growth}
            </span>
          </div>

          <div className="mt-5">
            <p className="text-sm text-gray-500">
              {item.label}
            </p>

            <h2 className="text-3xl font-bold mt-1 text-[#0E0F0C]">
              {item.value}
            </h2>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AnalyticsStats;