import React from "react";

const QuickActions = () => {
    return (
        <div className="mt-6 bg-white border border-black/10 rounded-2xl p-5">
            <h2 className="text-lg font-semibold mb-5">
                Quick Actions
            </h2>

            <div className="flex flex-wrap gap-3">
                <button className="px-5 py-3 rounded-xl bg-[#9FE870] text-[#163300] font-medium hover:opacity-90">
                    + Create Form
                </button>

                <button className="px-5 py-3 rounded-xl border border-black/10 hover:bg-black/5">
                    View Responses
                </button>

                <button className="px-5 py-3 rounded-xl border border-black/10 hover:bg-black/5">
                    Invite Team
                </button>

                <button className="px-5 py-3 rounded-xl border border-black/10 hover:bg-black/5">
                    Export Analytics
                </button>
            </div>
        </div>
    );
};

export default QuickActions;