import React from "react";

import { Eye, Download } from "lucide-react";

export const createColumns = (fields) => {
    return [
        {
            accessorKey: "index",

            header: "#",

            size: 70,

            enableSorting: false,

            cell: ({ row }) => row.index + 1,
        },

        ...fields.map((field) => ({
            accessorKey: field.label,

            header: field.label,

            size: 240,

            sortingFn: (a, b) => {
                const valA = a.original.userResponse?.[field.label];

                const valB = b.original.userResponse?.[field.label];

                return String(valA || "")
                    .toLowerCase()
                    .localeCompare(String(valB || "").toLowerCase());
            },

            cell: ({ row }) => {
                const value = row.original.userResponse?.[field.label];

                if (value === null || value === undefined) {
                    return "-";
                }

                if (Array.isArray(value)) {
                    return (
                        <div className="flex flex-wrap gap-1">
                            {value.map((item, i) => (
                                <span
                                    key={i}
                                    className="
                    px-2 py-1
                    rounded-full
                    text-xs
                    bg-[#163300]/10
                    text-[#163300]
                  "
                                >
                                    {item}
                                </span>
                            ))}
                        </div>
                    );
                }

                if (field.type === "file" || field.type === "signature") {
                    return (
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => console.log("VIEW:", value)}
                                className="p-2 rounded-md border border-black/10 cursor-pointer"
                            >
                                <Eye size={16} />
                            </button>

                            <button
                                onClick={() => console.log("DOWNLOAD:", value)}
                                className=" p-2 rounded-md border border-black/10 cursor-pointer"
                            >
                                <Download size={16} />
                            </button>
                        </div>
                    );
                }

                return value.toString();
            },
        })),
    ];
};
