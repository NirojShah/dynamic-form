import React from "react";

import {
    Search,
    Download,
} from "lucide-react";

const TableToolbar = ({
    globalFilter,
    setGlobalFilter,
    onExport,
}) => {
    return (
        <div className="px-6 py-5 border-b border-black/10 flex items-center justify-between">
            <div>
                <h2 className="text-lg font-semibold">
                    Responses
                </h2>

                <p className="text-sm text-gray-500">
                    Manage submitted responses
                </p>
            </div>

            <div className="flex items-center gap-3">
                <div className="relative">
                    <Search
                        size={16}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                    />

                    <input
                        type="text"
                        placeholder="Search..."
                        value={globalFilter}
                        onChange={(e) =>
                            setGlobalFilter(
                                e.target.value
                            )
                        }
                        className="
              pl-9 pr-3 py-2
              border border-black/10
              rounded-lg
              text-sm
            "
                    />
                </div>

                <button
                    onClick={onExport}
                    className="
            px-4 py-2
            rounded-lg
            bg-[#163300]
            text-white
            flex items-center gap-2
          "
                >
                    <Download size={16} />
                    Export
                </button>
            </div>
        </div>
    );
};

export default TableToolbar;