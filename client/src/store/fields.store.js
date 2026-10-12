// fields.store.js
import { create } from "zustand";

const formFieldStore = create((set) => ({
  // right panel selection
  type: null,
  label: null,
  selectedId: null,

  // the actual form fields array
  fields: [],

  setSelectedField: (data) =>
    set(() => ({
      type: data.type,
      label: data.label,
      selectedId: data.id ?? null,
    })),

  addField: (field) =>
    set((state) => ({
      fields: [...state.fields, field],
      type: field.type,
      label: field.label,
      selectedId: field.id,
    })),

  updateField: (id, patch) =>
    set((state) => ({
      fields: state.fields.map((f) => (f.id === id ? { ...f, ...patch } : f)),
    })),

  removeField: (id) =>
    set((state) => ({
      fields: state.fields.filter((f) => f.id !== id),
      type: null,
      label: null,
      selectedId: null,
    })),

  reorderFields: (from, to) =>
    set((state) => {
      const arr = [...state.fields];
      const [moved] = arr.splice(from, 1);
      arr.splice(to, 0, moved);
      return { fields: arr };
    }),

  clearAllFields: () => {
    set(() => ({
      fields: [],
    }));
  },
}));

export default formFieldStore;
