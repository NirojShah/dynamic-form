import React from "react";

import {
    ChevronLeft,
    ChevronRight,
} from "lucide-react";

const TablePagination = ({
    table,
}) => {
    return (
        <div className="px-6 py-4 border-t border-black/10 flex items-center justify-between">
            <div className="text-sm text-gray-500">
                Page{" "}
                {table.getState().pagination
                    .pageIndex + 1}{" "}
                of {table.getPageCount()}
            </div>

            <div className="flex items-center gap-2">
                <button
                    onClick={() =>
                        table.previousPage()
                    }
                    disabled={
                        !table.getCanPreviousPage()
                    }
                    className="p-2 border rounded-md"
                >
                    <ChevronLeft size={16} />
                </button>

                <button
                    onClick={() =>
                        table.nextPage()
                    }
                    disabled={
                        !table.getCanNextPage()
                    }
                    className="p-2 border rounded-md"
                >
                    <ChevronRight size={16} />
                </button>
            </div>
        </div>
    );
};

export default TablePagination;