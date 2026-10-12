// FieldLayout.jsx
import React, { useState, useEffect } from "react";
import formFieldStore from "../../store/fields.store";

const Toggle = ({ value, onChange }) => (
  <div
    onClick={() => onChange(!value)}
    className={`relative w-8 h-4.5 rounded-full cursor-pointer transition-colors duration-200 ${value ? "bg-[#9FE870]" : "bg-black/15"
      }`}
  >
    <div
      className={`absolute top-0.5 w-3.5 h-3.5 rounded-full bg-white transition-transform duration-200 ${value ? "translate-x-3.5 left-0.5" : "left-0.5"
        }`}
    />
  </div>
);

const Section = ({ label }) => (
  <div className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider pt-1 border-t border-black/8">
    {label}
  </div>
);

const RpInput = ({ value, onChange, placeholder }) => (
  <input
    className="w-full border border-black/12 rounded-md px-2 py-1.5 text-[13px] text-[#0E0F0C] bg-white outline-none focus:ring-1 focus:ring-[#9FE870] focus:border-[#9FE870] placeholder:text-gray-400"
    value={value ?? ""}
    onChange={(e) => onChange(e.target.value)}
    placeholder={placeholder}
  />
);

const OptionsEditor = ({ options, onChange }) => {
  const add = () => onChange([...options, `Option ${options.length + 1}`]);
  const remove = (i) => onChange(options.filter((_, idx) => idx !== i));
  const update = (i, val) =>
    onChange(options.map((o, idx) => (idx === i ? val : o)));

  return (
    <div className="flex flex-col gap-1.5">
      {options.map((opt, i) => (
        <div key={i} className="flex items-center gap-1.5">
          <span className="text-gray-300 cursor-grab text-[11px]">⠿</span>
          <input
            className="flex-1 border border-black/12 rounded-md px-2 py-1.25 text-[13px] outline-none focus:ring-1 focus:ring-[#9FE870]"
            value={opt}
            onChange={(e) => update(i, e.target.value)}
          />
          <button
            onClick={() => remove(i)}
            className="text-gray-400 hover:text-red-500 hover:bg-red-50 rounded px-1.25 py-0.5 text-[13px] transition"
          >
            ✕
          </button>
        </div>
      ))}
      <button
        onClick={add}
        className="text-[12px] text-[#3a7a1a] text-left py-1 hover:opacity-70 transition"
      >
        + Add option
      </button>
    </div>
  );
};

const LogicSection = ({ rules, onAdd }) => (
  <div className="flex flex-col gap-1.5">
    <div className="flex items-center gap-1.5 px-2 py-1.25 border border-black/10 rounded-md bg-black/2 text-[12px] text-gray-500">
      <div className="w-1.5 h-1.5 rounded-full bg-[#9FE870]" />
      {rules?.length > 0 ? `${rules.length} rule(s) active` : "Show always"}
    </div>
    <button
      onClick={onAdd}
      className="text-[12px] text-gray-400 text-left hover:text-gray-600 transition"
    >
      + Add conditional rule
    </button>
  </div>
);

const BaseFields = ({ settings, update }) => (
  <>
    <div className="flex justify-between items-center">
      <span className="text-[13px] text-[#0E0F0C]">Required</span>
      <Toggle value={settings.required} onChange={(v) => update("required", v)} />
    </div>
    <div className="flex justify-between items-center">
      <span className="text-[13px] text-[#0E0F0C]">Hidden</span>
      <Toggle value={settings.hidden} onChange={(v) => update("hidden", v)} />
    </div>
    <Section label="Label" />
    <RpInput
      value={settings.label}
      onChange={(v) => update("label", v)}
      placeholder="Field label…"
    />
  </>
);

const fieldDefaults = {
  text: { required: false, hidden: false, label: "Short text", placeholder: "", helpText: "" },
  textarea: { required: false, hidden: false, label: "Long text", placeholder: "", helpText: "" },
  email: { required: false, hidden: false, label: "Email", placeholder: "you@example.com", helpText: "" },
  phone: { required: false, hidden: false, label: "Phone", placeholder: "+1 (555) 000-0000", helpText: "" },
  number: { required: false, hidden: false, label: "Number", placeholder: "0", helpText: "" },
  radio: { required: false, hidden: false, label: "Multiple choice", placeholder: "", helpText: "", options: ["Option 1", "Option 2"] },
  checkbox: { required: false, hidden: false, label: "Checkboxes", placeholder: "", helpText: "", options: ["Option 1", "Option 2"] },
  select: { required: false, hidden: false, label: "Dropdown", placeholder: "Select…", helpText: "", options: ["Option 1", "Option 2"] },
  rating: { required: false, hidden: false, label: "Rating", helpText: "", maxStars: 5 },
  scale: { required: false, hidden: false, label: "Scale", helpText: "", min: 1, max: 10 },
  date: { required: false, hidden: false, label: "Date", helpText: "" },
  file: { required: false, hidden: false, label: "File upload", helpText: "" },
  signature: { required: false, hidden: false, label: "Signature", helpText: "" },
  heading: { label: "Heading", level: "h2" },
  divider: {},
};

const FieldLayout = () => {
  // ✅ Read the full selected field object instead of just type/label/selectedId
  const selectedField = formFieldStore((s) =>
    s.fields.find((f) => f.id === s.selectedId)
  );
  const selectedId = formFieldStore((s) => s.selectedId);
  const updateField = formFieldStore((s) => s.updateField);
  const removeField = formFieldStore((s) => s.removeField);

  const [settings, setSettings] = useState({});

  // ✅ Seed settings from actual field data — real values override defaults
  useEffect(() => {
    if (selectedField) {
      setSettings({
        ...(fieldDefaults[selectedField.type] || {}), // safe defaults as fallback
        ...selectedField,                              // actual stored values win
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedField?.id]); // only re-seed when the selected field ID changes

  // Derive type from the selected field, not a separate store slice
  const type = selectedField?.type;

  if (!type) return null;

  const update = (key, val) => {
    setSettings((prev) => ({ ...prev, [key]: val }));
    if (selectedId) updateField(selectedId, { [key]: val });
  };

  const isChoice = ["radio", "checkbox", "select"].includes(type);
  const hasPlaceholder = ["text", "textarea", "email", "phone", "number", "select"].includes(type);
  const hasHelpText = !["divider", "heading"].includes(type);
  const hasLogic = !["divider", "heading"].includes(type);
  const hasBaseToggles = !["divider", "heading"].includes(type);

  return (
    <div className="w-72 min-h-full border-l border-black/10 bg-white flex flex-col">
      {/* HEADER */}
      <div className="px-4 py-3 border-b border-black/8 bg-[#fafaf9]">
        <div className="text-[13px] font-semibold text-[#0E0F0C]">Field settings</div>
        <div className="text-[11px] text-gray-400 capitalize mt-0.5">
          {settings.label || type}
        </div>
      </div>

      {/* BODY */}
      <div className="p-4 flex flex-col gap-3 overflow-y-auto flex-1">

        {/* ── DIVIDER ── */}
        {type === "divider" && (
          <p className="text-[12px] text-gray-400">No settings for divider.</p>
        )}

        {/* ── HEADING ── */}
        {type === "heading" && (
          <>
            <Section label="Label" />
            <RpInput
              value={settings.label}
              onChange={(v) => update("label", v)}
              placeholder="Heading text…"
            />
            <Section label="Level" />
            <select
              className="w-full border border-black/12 rounded-md px-2 py-1.5 text-[13px] outline-none focus:ring-1 focus:ring-[#9FE870]"
              value={settings.level || "h2"}
              onChange={(e) => update("level", e.target.value)}
            >
              <option value="h1">H1 — Large</option>
              <option value="h2">H2 — Medium</option>
              <option value="h3">H3 — Small</option>
            </select>
          </>
        )}

        {/* ── BASE TOGGLES (required / hidden / label) ── */}
        {hasBaseToggles && <BaseFields settings={settings} update={update} />}

        {/* ── PLACEHOLDER ── */}
        {hasPlaceholder && (
          <>
            <Section label="Placeholder" />
            <RpInput
              value={settings.placeholder}
              onChange={(v) => update("placeholder", v)}
              placeholder="Placeholder text…"
            />
          </>
        )}

        {/* ── HELP TEXT ── */}
        {hasHelpText && (
          <>
            <Section label="Help text" />
            <RpInput
              value={settings.helpText}
              onChange={(v) => update("helpText", v)}
              placeholder="Add help text…"
            />
          </>
        )}

        {/* ── OPTIONS (radio / checkbox / select) ── */}
        {isChoice && (
          <>
            <Section label="Options" />
            <OptionsEditor
              options={settings.options || []}
              onChange={(v) => update("options", v)}
            />
          </>
        )}

        {/* ── RATING ── */}
        {type === "rating" && (
          <>
            <Section label="Max stars" />
            <div className="flex items-center gap-3">
              <input
                type="range"
                min={3}
                max={10}
                step={1}
                value={settings.maxStars || 5}
                onChange={(e) => update("maxStars", +e.target.value)}
                className="flex-1"
              />
              <span className="text-[13px] font-medium w-5 text-center">
                {settings.maxStars || 5}
              </span>
            </div>
            <div className="flex gap-1">
              {Array.from({ length: settings.maxStars || 5 }).map((_, i) => (
                <span key={i} className="text-[#f5a623] text-[16px]">★</span>
              ))}
            </div>
          </>
        )}

        {/* ── SCALE ── */}
        {type === "scale" && (
          <>
            <Section label="Range" />
            <div className="flex gap-2 items-center">
              <input
                type="number"
                value={settings.min ?? 1}
                onChange={(e) => update("min", +e.target.value)}
                className="w-full border border-black/12 rounded-md px-2 py-1.5 text-[13px] outline-none focus:ring-1 focus:ring-[#9FE870]"
                placeholder="Min"
              />
              <span className="text-gray-400 text-[12px]">to</span>
              <input
                type="number"
                value={settings.max ?? 10}
                onChange={(e) => update("max", +e.target.value)}
                className="w-full border border-black/12 rounded-md px-2 py-1.5 text-[13px] outline-none focus:ring-1 focus:ring-[#9FE870]"
                placeholder="Max"
              />
            </div>
          </>
        )}

        {/* ── LOGIC ── */}
        {hasLogic && (
          <>
            <Section label="Logic" />
            <LogicSection rules={settings.rules} onAdd={() => { }} />
          </>
        )}

        {/* ── REMOVE ── */}
        {type !== "divider" && (
          <div className="mt-2">
            <button
              onClick={() => removeField(selectedId)}
              className="w-full py-1.75 rounded-md border border-red-200 bg-red-50 text-red-600 text-[12px] hover:bg-red-100 transition"
            >
              Remove field
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FieldLayout;