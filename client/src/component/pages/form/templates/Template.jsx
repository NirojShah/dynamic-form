import React, { useEffect, useState } from "react";
import formsApi from "../../../../utility/forms.api";
import FormCard from "../../../common/FormCards";

const Template = () => {
    const [publicForms, setPublicForms] = useState([]);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(6);

    const [loading, setLoading] = useState(false);

    // pagination states
    const [hasNextPage, setHasNextPage] = useState(false);
    const [hasPreviousPage, setHasPreviousPage] = useState(false);
    const [totalPages, setTotalPages] = useState(1);

    const fetchPublicForms = async () => {
        try {
            setLoading(true);

            const resp = await formsApi.fetchPublicForms({
                page,
                limit,
            });

            console.log(resp);

            if (resp.success) {
                // API data
                setPublicForms(resp.data || []);

                // pagination data
                setHasNextPage(resp.pagination?.hasNextPage || false);
                setHasPreviousPage(
                    resp.pagination?.hasPreviousPage || false
                );
                setTotalPages(resp.pagination?.totalPages || 1);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPublicForms();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page, limit]);

    const handleClick = (id) => {
        console.log(id);
    };

    const handleNextPage = () => {
        if (hasNextPage) {
            setPage((prev) => prev + 1);
        }
    };

    const handlePreviousPage = () => {
        if (hasPreviousPage) {
            setPage((prev) => prev - 1);
        }
    };

    const handleLimitChange = (e) => {
        setLimit(Number(e.target.value));
        setPage(1);
    };

    return (
        <div className="w-full">
            {/* Top Controls */}
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold">
                    Public Templates
                </h2>

                <div className="flex items-center gap-2">
                    <label className="text-sm font-medium">
                        Forms per page:
                    </label>

                    <select
                        value={limit}
                        onChange={handleLimitChange}
                        className="border-2 border-[#348303] rounded-md px-5 py-1"
                    >
                        <option value={3}>3</option>
                        <option value={6}>6</option>
                        <option value={9}>9</option>
                        <option value={12}>12</option>
                    </select>
                </div>
            </div>

            {/* Loading */}
            {loading ? (
                <div className="text-center py-10">
                    Loading templates...
                </div>
            ) : (
                <>
                    {/* Forms Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {publicForms.length > 0 ? (
                            publicForms.map((val) => (
                                <FormCard
                                    key={val.id}
                                    className="w-full"
                                    description={val.description}
                                    organization="Public Template"
                                    title={val.name}
                                    onClick={() => handleClick(val.id)}
                                    template={true}
                                />
                            ))
                        ) : (
                            <div className="col-span-full text-center py-10 text-gray-500">
                                No templates found.
                            </div>
                        )}
                    </div>

                    {/* Pagination */}
                    <div className="flex items-center justify-center gap-4 mt-8">
                        <button
                            onClick={handlePreviousPage}
                            disabled={!hasPreviousPage}
                            className={`px-4 py-2 rounded-md border ${!hasPreviousPage
                                ? "opacity-50 cursor-not-allowed"
                                : "hover:bg-gray-100"
                                }`}
                        >
                            Previous
                        </button>

                        <span className="font-medium">
                            Page {page} of {totalPages}
                        </span>

                        <button
                            onClick={handleNextPage}
                            disabled={!hasNextPage}
                            className={`px-4 py-2 rounded-md border ${!hasNextPage
                                ? "opacity-50 cursor-not-allowed"
                                : "hover:bg-gray-100"
                                }`}
                        >
                            Next
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default Template;