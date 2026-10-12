// CreateForm.jsx
import React, { useEffect, useState } from "react";
import formFieldStore from "../../../../store/fields.store";
import Button from "../../../common/Button";
import formsApi from "../../../../utility/forms.api";

// Renders a read-only preview of a field's input based on its type
const FieldInput = ({ field }) => {
  const inputCls =
    "w-full border border-black/10 rounded-md px-3 py-2 text-[13px] text-gray-400 bg-white pointer-events-none select-none";

  switch (field.type) {
    case "text":
    case "email":
    case "phone":
    case "number":
      return (
        <div className={inputCls}>
          {field.placeholder || <span className="text-gray-300">—</span>}
        </div>
      );

    case "textarea":
      return (
        <div className={`${inputCls} min-h-16`}>
          {field.placeholder || <span className="text-gray-300">—</span>}
        </div>
      );

    case "select":
      return (
        <div className={`${inputCls} flex justify-between items-center`}>
          <span>{field.placeholder || "Select…"}</span>
          <span className="text-gray-300 text-[11px]">▾</span>
        </div>
      );

    case "radio":
      return (
        <div className="flex flex-col gap-1.5">
          {(field.options || []).map((opt, i) => (
            <div
              key={i}
              className="flex items-center gap-2 text-[13px] text-gray-500"
            >
              <div className="w-3.5 h-3.5 rounded-full border border-gray-300 shrink-0" />
              {opt}
            </div>
          ))}
        </div>
      );

    case "checkbox":
      return (
        <div className="flex flex-col gap-1.5">
          {(field.options || []).map((opt, i) => (
            <div
              key={i}
              className="flex items-center gap-2 text-[13px] text-gray-500"
            >
              <div className="w-3.5 h-3.5 rounded border border-gray-300 shrink-0" />
              {opt}
            </div>
          ))}
        </div>
      );

    case "rating":
      return (
        <div className="flex gap-1">
          {Array.from({ length: field.maxStars || 5 }).map((_, i) => (
            <span key={i} className="text-gray-200 text-[20px] leading-none">
              ★
            </span>
          ))}
        </div>
      );

    case "scale":
      return (
        <div className="flex items-center gap-2 text-[12px] text-gray-400">
          <span>{field.min ?? 1}</span>
          <div className="flex-1 h-0.75 bg-gray-100 rounded-full" />
          <span>{field.max ?? 10}</span>
        </div>
      );

    case "date":
      return <div className={inputCls}>MM / DD / YYYY</div>;

    case "file":
      return (
        <div className="border border-dashed border-black/15 rounded-md px-3 py-4 text-[12px] text-gray-400 text-center pointer-events-none">
          Click to upload or drag & drop
        </div>
      );

    case "signature":
      return (
        <div className="border border-dashed border-black/15 rounded-md h-16 flex items-center justify-center text-[12px] text-gray-300 pointer-events-none">
          Signature area
        </div>
      );

    case "heading": {
      const sizes = { h1: "text-2xl", h2: "text-xl", h3: "text-base" };
      return (
        <p
          className={`${sizes[field.level] || "text-xl"} font-semibold text-[#0E0F0C]`}
        >
          {field.label || "Heading"}
        </p>
      );
    }

    case "divider":
      return <hr className="border-black/10" />;

    default:
      return null;
  }
};

// A single field card in the canvas
const FieldPreview = ({ field, isSelected, onClick }) => {
  const isDivider = field.type === "divider";
  const isHeading = field.type === "heading";
  const isLayout = isDivider || isHeading;

  return (
    <div
      onClick={onClick}
      className={`relative group rounded-lg border transition-all cursor-pointer
        ${isSelected
          ? "border-[#9FE870] bg-[#f7fff2] shadow-sm"
          : "border-black/10 bg-white hover:border-black/20"
        }
        ${isLayout ? "px-4 py-3" : "px-4 pt-3 pb-4"}
      `}
    >
      {/* drag handle — visible on hover */}
      <span className="absolute left-1.5 top-1/2 -translate-y-1/2 text-gray-300 text-[11px] opacity-0 group-hover:opacity-100 cursor-grab select-none">
        ⠿
      </span>

      {/* required badge */}
      {field.required && (
        <span className="absolute top-2 right-2 text-[10px] text-red-400 font-medium">
          required
        </span>
      )}

      {/* label + help text (skip for layout fields) */}
      {!isLayout && (
        <div className="mb-2">
          <span className="text-[13px] font-medium text-[#0E0F0C]">
            {field.label || field.type}
          </span>
          {field.required && <span className="text-red-400 ml-0.5">*</span>}
          {field.helpText && (
            <p className="text-[11px] text-gray-400 mt-0.5">
              {field.helpText}
            </p>
          )}
        </div>
      )}

      <FieldInput field={field} />
    </div>
  );
};

const CreateForm = ({ formTitle = "", formDescription = "", isUpdate = false }) => {
  const fields = formFieldStore((s) => s.fields);
  const selectedId = formFieldStore((s) => s.selectedId);
  const addField = formFieldStore((s) => s.addField);
  const setSelected = formFieldStore((s) => s.setSelectedField);

  const field = formFieldStore((state) => state.fields);

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setDesc(formDescription);
    setTitle(formTitle);
  }, [formTitle, formDescription])

  const handleAddField = () => {
    const newField = {
      id: crypto.randomUUID(),
      type: "text",
      label: "Short text",
      required: false,
      hidden: false,
      placeholder: "",
      helpText: "",
    };
    addField(newField);
  };

  const handleCreateform = async (fields, title, desc) => {
    try {
      const resp = await formsApi.createForm({ desc, fields, title });
      console.log({ resp });
    } catch (err) {
      console.log(err);
    }
  };

  const handleUpdateForm = async (fields, title, desc) => {
    await formsApi.updateForm({ description: desc, title: title, fields, initialname: formTitle })
  }

  return (
    <div className="flex-1 overflow-y-auto bg-[#f5f5f3] p-6 flex flex-col items-center">
      <div className="w-full max-w-150 flex flex-col gap-3">
        {/* FORM HEADER CARD */}
        <div className="bg-white rounded-xl border border-black/8 overflow-hidden">
          <div className="h-1.5 bg-[#9FE870]" />
          <div className="p-5 flex flex-col gap-1.5">
            <input
              className="text-xl font-semibold text-[#0E0F0C] outline-none placeholder:text-gray-300 bg-transparent w-full"
              placeholder="Form title…"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <input
              className="text-[13px] text-gray-500 outline-none placeholder:text-gray-300 bg-transparent w-full"
              placeholder="Add a description (optional)…"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
            />
          </div>
        </div>

        {/* FIELD CARDS — hidden fields are greyed out in builder but still shown */}
        {fields.map((field) => (
          <div key={field.id} className={field.hidden ? "opacity-40" : ""}>
            <FieldPreview
              field={field}
              isSelected={field.id === selectedId}
              onClick={() =>
                setSelected({
                  id: field.id,
                  type: field.type,
                  label: field.label,
                })
              }
            />
          </div>
        ))}

        {/* ADD FIELD BUTTON */}
        <button
          onClick={handleAddField}
          className="w-full py-3 rounded-lg border border-dashed border-black/15 text-[13px] text-gray-400 hover:border-[#9FE870] hover:text-[#3a7a1a] hover:bg-[#f7fff2] transition"
        >
          + Add a field
        </button>
      </div>
      <div className="m-2">
        {
          isUpdate &&

          <Button
            type="primary"
            onClick={() => {
              handleUpdateForm(field, title, desc);
            }}
          >
            update
          </Button>
        }

        {
          !isUpdate &&
          <Button
            type="primary"
            onClick={() => {
              handleCreateform(field, title, desc);
            }}
          >
            submit
          </Button>
        }

      </div>
    </div>
  );
};

export default CreateForm;
