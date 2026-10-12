
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CreateForm from "../create-form/CreateForm";
import formsApi from "../../../../utility/forms.api";
import formFieldStore from "../../../../store/fields.store";

const UpdateFormPage = () => {
    const { title, organization } = useParams();
    const [desc, setDesc] = useState("")
    // Use clearAllFields instead of the stale-closure approach
    const addField = formFieldStore((s) => s.addField);
    const clearAllFields = formFieldStore((s) => s.clearAllFields);

    useEffect(() => {
        loadForm();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const loadForm = async () => {
        try {
            const resp = await formsApi.getForm({ title, organization });
            setDesc(resp.data.description);
            const form = resp.data.fields;

            // ✅ Atomic clear — no stale closure issue
            clearAllFields();

            const mappedFields = form.map((f) => ({
                id: f.key,          // stable id from backend
                key: f.key,
                type: f.type,
                label: f.label,
                placeholder: f.placeholder ?? "",
                required: f.required ?? false,
                hidden: f.hidden ?? false,
                helpText: f.helpText ?? "",
                refSchemaId: f.refSchemaId ?? null,
                // ✅ API returns [{label, value}], flatten to strings for OptionsEditor
                options: (f.options ?? []).map((o) =>
                    typeof o === "string" ? o : o.label
                ),
                maxStars: f.maxStars ?? 5,
                min: f.min ?? 1,
                max: f.max ?? 10,
                level: f.level ?? "h2",
            }));

            mappedFields.forEach((field) => addField(field));
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="flex h-screen bg-[#f5f5f3] overflow-hidden">
            <CreateForm mode="update" formTitle={title} formDescription={desc} isUpdate={true} />
        </div>
    );
};

export default UpdateFormPage;