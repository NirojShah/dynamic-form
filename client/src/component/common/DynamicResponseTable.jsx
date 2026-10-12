import React, {
    useMemo,
    useState,
} from "react";

import {
    useReactTable,
    getCoreRowModel,
    getSortedRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    flexRender,
} from "@tanstack/react-table";

import {
    ArrowDown,
    ArrowUp,
    ArrowUpDown,
} from "lucide-react";

import TableToolbar from "./table/TableToolbar";

import TablePagination from "./table/TablePagination";

import ExportModal from "./table/ExportModal";

import { createColumns } from "./table/TableColumn";

const DynamicResponseTable = ({
    fields = [],
    data = [],
}) => {
    const visibleFields = fields.filter(
        (f) => f.type !== "divider"
    );

    const columns = useMemo(
        () =>
            createColumns(
                visibleFields
            ),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [fields]
    );

    const [sorting, setSorting] =
        useState([]);

    const [globalFilter, setGlobalFilter] =
        useState("");

    const [pagination, setPagination] =
        useState({
            pageIndex: 0,
            pageSize: 10,
        });

    const [columnSizing, setColumnSizing] =
        useState({});

    const [showExport, setShowExport] =
        useState(false);

    const table = useReactTable({
        data,

        columns,

        state: {
            sorting,
            globalFilter,
            pagination,
            columnSizing,
        },

        onSortingChange:
            setSorting,

        onGlobalFilterChange:
            setGlobalFilter,

        onPaginationChange:
            setPagination,

        onColumnSizingChange:
            setColumnSizing,

        enableColumnResizing: true,

        columnResizeMode:
            "onChange",

        getCoreRowModel:
            getCoreRowModel(),

        getSortedRowModel:
            getSortedRowModel(),

        getFilteredRowModel:
            getFilteredRowModel(),

        getPaginationRowModel:
            getPaginationRowModel(),

        globalFilterFn: (
            row,
            _,
            filterValue
        ) => {
            const values =
                Object.values(
                    row.original
                        .userResponse || {}
                );

            return values.some((val) =>
                String(val)
                    .toLowerCase()
                    .includes(
                        filterValue.toLowerCase()
                    )
            );
        },
    });

    return (
        <>
            <div className="w-full bg-white border border-black/10 rounded-2xl overflow-hidden">
                <TableToolbar
                    globalFilter={
                        globalFilter
                    }
                    setGlobalFilter={
                        setGlobalFilter
                    }
                    onExport={() =>
                        setShowExport(true)
                    }
                />

                <div className="overflow-auto">
                    <table
                        className="min-w-full border-collapse table-fixed"
                        style={{
                            width:
                                table.getCenterTotalSize(),
                        }}
                    >
                        <thead className="bg-[#FAFAF8]">
                            {table
                                .getHeaderGroups()
                                .map(
                                    (headerGroup) => (
                                        <tr
                                            key={
                                                headerGroup.id
                                            }
                                        >
                                            {headerGroup.headers.map(
                                                (
                                                    header
                                                ) => (
                                                    <th
                                                        key={
                                                            header.id
                                                        }
                                                        style={{
                                                            width:
                                                                header.getSize(),
                                                        }}
                                                        className=" relative border-r border-b border-black/10 px-4 py-4 text-left text-xs font-semibold uppercase
                            "
                                                    >
                                                        <div
                                                            onClick={header.column.getToggleSortingHandler()}
                                                            className="flex items-center gap-2 cursor-pointer"
                                                        >
                                                            {flexRender(
                                                                header
                                                                    .column
                                                                    .columnDef
                                                                    .header,
                                                                header.getContext()
                                                            )}

                                                            {{
                                                                asc: (
                                                                    <ArrowUp size={14} />
                                                                ),

                                                                desc: (
                                                                    <ArrowDown size={14} />
                                                                ),
                                                            }[
                                                                header.column.getIsSorted()
                                                            ] ?? (
                                                                    <ArrowUpDown size={14} />
                                                                )}
                                                        </div>

                                                        <div
                                                            onMouseDown={header.getResizeHandler()}
                                                            onTouchStart={header.getResizeHandler()}
                                                            className=" absolute top-0 right-0 h-full w-2 cursor-col-resize hover:bg-[#9FE870]
                              "
                                                        />
                                                    </th>
                                                )
                                            )}
                                        </tr>
                                    )
                                )}
                        </thead>

                        <tbody>
                            {table
                                .getRowModel()
                                .rows.map((row) => (
                                    <tr
                                        key={row.id}
                                        className="hover:bg-[#FAFAF8]"
                                    >
                                        {row
                                            .getVisibleCells()
                                            .map((cell) => (
                                                <td
                                                    key={cell.id}
                                                    style={{
                                                        width:
                                                            cell.column.getSize(),
                                                    }}
                                                    className=" border-r border-b border-black/10 px-4 py-4 text-sm
                          "
                                                >
                                                    {flexRender(
                                                        cell.column
                                                            .columnDef
                                                            .cell,
                                                        cell.getContext()
                                                    )}
                                                </td>
                                            ))}
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </div>

                <TablePagination
                    table={table}
                />
            </div>

            <ExportModal
                visible={showExport}
                onClose={() =>
                    setShowExport(false)
                }
            />
        </>
    );
};

export default DynamicResponseTable;