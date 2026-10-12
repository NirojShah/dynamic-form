import React from "react";

const RecentResponses = ({ responses }) => {
    return (
        <div className="bg-white border border-black/10 rounded-2xl p-5">
            <div className="mb-5">
                <h2 className="text-lg font-semibold">
                    Recent Responses
                </h2>

                <p className="text-sm text-gray-500">
                    Latest activity
                </p>
            </div>

            <div className="space-y-5">
                {responses.map((item) => (
                    <div
                        key={item.id}
                        className="flex items-start gap-3"
                    >
                        <div className="w-10 h-10 rounded-full bg-[#163300]/10 flex items-center justify-center text-sm font-semibold text-[#163300]">
                            {item.user
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                        </div>

                        <div>
                            <h3 className="text-sm font-medium">
                                {item.user}
                            </h3>

                            <p className="text-xs text-gray-500">
                                submitted{" "}
                                <span className="font-medium">
                                    {item.form}
                                </span>
                            </p>

                            <p className="text-xs text-gray-400 mt-1">
                                {item.time}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RecentResponses;