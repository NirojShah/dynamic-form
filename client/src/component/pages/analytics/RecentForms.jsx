import React from "react";

const RecentForms = ({ forms }) => {
  return (
    <div className="xl:col-span-2 bg-white border border-black/10 rounded-2xl p-5">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="text-lg font-semibold">
            Recent Forms
          </h2>

          <p className="text-sm text-gray-500">
            Recently updated forms
          </p>
        </div>

        <button className="text-sm text-[#163300] font-medium">
          View all
        </button>
      </div>

      <div className="space-y-3">
        {forms.map((form) => (
          <div
            key={form.id}
            className="
              flex items-center justify-between
              border border-black/10
              rounded-xl
              px-4 py-4
              hover:bg-black/5
              transition
              cursor-pointer
            "
          >
            <div>
              <h3 className="font-medium text-[#0E0F0C]">
                {form.name}
              </h3>

              <p className="text-sm text-gray-500 mt-1">
                {form.responses} responses
              </p>
            </div>

            <div
              className={`
                px-3 py-1 rounded-full text-xs font-medium
                ${
                  form.status === "Active"
                    ? "bg-green-100 text-green-700"
                    : "bg-gray-100 text-gray-500"
                }
              `}
            >
              {form.status}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentForms;