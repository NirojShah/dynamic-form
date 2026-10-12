// FieldLibrary.jsx
import React, { useState } from "react";
import formFieldStore from "../../store/fields.store";

const FieldLibrary = ({ onSelect }) => {
  const [search, setSearch] = useState("");
  const addField = formFieldStore((s) => s.addField);

  const groups = [
    {
      title: "Basic",
      color: "bg-[#163300]/10 text-[#163300]",
      fields: [
        { label: "Short text",     icon: "T", type: "text" },
        { label: "Long text",      icon: "¶", type: "textarea" },
        { label: "Email",          icon: "@", type: "email" },
        { label: "Phone",          icon: "✆", type: "phone" },
        { label: "Number",         icon: "#", type: "number" },
        { label: "Multiple choice",icon: "◉", type: "radio" },
        { label: "Checkboxes",     icon: "☑", type: "checkbox" },
        { label: "Dropdown",       icon: "▾", type: "select" },
      ],
    },
    {
      title: "Advanced",
      color: "bg-cyan-100 text-cyan-700",
      fields: [
        { label: "Rating",      icon: "★", type: "rating" },
        { label: "Scale",       icon: "⟷", type: "scale" },
        { label: "Date",        icon: "⊡", type: "date" },
        { label: "File upload", icon: "↑", type: "file" },
        { label: "Signature",   icon: "✎", type: "signature" },
      ],
    },
    {
      title: "Layout",
      color: "bg-orange-100 text-orange-700",
      fields: [
        { label: "Divider", icon: "—", type: "divider" },
        { label: "Heading", icon: "H", type: "heading" },
      ],
    },
  ];

  const handleSelect = (field) => {
    const isChoice = ["radio", "checkbox", "select"].includes(field.type);

    const newField = {
      id:          crypto.randomUUID(),
      type:        field.type,
      label:       field.label,
      required:    false,
      hidden:      false,
      placeholder: "",
      helpText:    "",
      // choice fields get default options
      ...(isChoice && { options: ["Option 1", "Option 2"] }),
      // rating gets maxStars
      ...(field.type === "rating" && { maxStars: 5 }),
      // scale gets range
      ...(field.type === "scale" && { min: 1, max: 10 }),
      // heading gets level
      ...(field.type === "heading" && { level: "h2" }),
    };

    addField(newField);
    onSelect?.(field);
  };

  const filterFields = (fields) =>
    fields.filter((f) =>
      f.label.toLowerCase().includes(search.toLowerCase())
    );

  return (
    <div className="w-full h-full flex flex-col border-r border-black/10 bg-white">
      {/* SEARCH */}
      <div className="p-3 border-b border-black/10">
        <input
          type="text"
          placeholder="Search fields…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-3 py-2 text-sm border rounded-md outline-none focus:ring-1 focus:ring-[#9FE870]"
        />
      </div>

      {/* FIELD GROUPS */}
      <div className="flex-1 overflow-y-auto p-3 space-y-6">
        {groups.map((group) => {
          const filtered = filterFields(group.fields);
          if (filtered.length === 0) return null;

          return (
            <div key={group.title}>
              <div className="text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wide">
                {group.title}
              </div>
              <div className="flex flex-col gap-2">
                {filtered.map((field) => (
                  <div
                    key={field.type}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSelect(field);
                    }}
                    className="flex items-center gap-3 px-3 py-2 rounded-md cursor-pointer hover:bg-black/5 transition"
                  >
                    <div
                      className={`w-7 h-7 flex items-center justify-center rounded ${group.color} text-xs font-semibold`}
                    >
                      {field.icon}
                    </div>
                    <span className="text-sm text-[#0E0F0C]">{field.label}</span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FieldLibrary;