import React from "react";

import { X } from "lucide-react";

const ExportModal = ({
    visible,
    onClose,
}) => {
    if (!visible) return null;

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="w-full max-w-md bg-white rounded-2xl p-6">
                <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold">
                        Export Responses
                    </h2>

                    <button onClick={onClose}>
                        <X size={18} />
                    </button>
                </div>

                <div className="mt-6">
                    Export settings here...
                </div>
            </div>
        </div>
    );
};

export default ExportModal;