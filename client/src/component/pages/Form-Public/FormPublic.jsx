import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import formsApi from "../../../utility/forms.api";

const FormPublic = () => {
    const { key } = useParams();

    const [form, setForm] = useState(null);
    const [formData, setFormData] = useState({});
    const [errors, setErrors] = useState({});
    const [submitted, setSubmitted] = useState(false);
    const canvasRefs = useRef({});

    useEffect(() => {
        const fetchForm = async () => {
            const resp = await formsApi.getPublicFormFields(key);
            if (resp.success) {
                const data = resp.data;
                setForm(data);

                const initial = {};
                data.fields.forEach((f) => {
                    if (f.type === "checkbox") initial[f.key] = [];
                    else if (f.type === "signature") initial[f.key] = null;
                    else if (f.type === "scale") initial[f.key] = 5;
                    else if (f.type === "rating") initial[f.key] = 0;
                    else initial[f.key] = "";
                });

                setFormData(initial);
            }
        };
        fetchForm();
    }, [key]);


    const handleChange = (key, value) => {
        setFormData((prev) => ({ ...prev, [key]: value }));
        setErrors((prev) => ({ ...prev, [key]: "" }));
    };

    const handleCheckbox = (fieldKey, value, checked) => {
        setFormData((prev) => {
            const current = prev[fieldKey] || [];
            return {
                ...prev,
                [fieldKey]: checked
                    ? [...current, value]
                    : current.filter((v) => v !== value),
            };
        });
    };

    // ✍️ Signature
    const getCoords = (e, canvas) => {
        const rect = canvas.getBoundingClientRect();
        if (e.touches) {
            return {
                x: e.touches[0].clientX - rect.left,
                y: e.touches[0].clientY - rect.top,
            };
        }
        return { x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY };
    };

    const startDrawing = (e, key) => {
        const canvas = canvasRefs.current[key];
        const ctx = canvas.getContext("2d");

        ctx.strokeStyle = "#0E0F0C";
        ctx.lineWidth = 2;
        ctx.lineCap = "round";

        const { x, y } = getCoords(e, canvas);
        ctx.beginPath();
        ctx.moveTo(x, y);
        canvas.isDrawing = true;
    };

    const draw = (e, key) => {
        const canvas = canvasRefs.current[key];
        if (!canvas.isDrawing) return;

        const ctx = canvas.getContext("2d");
        const { x, y } = getCoords(e, canvas);

        ctx.lineTo(x, y);
        ctx.stroke();
    };

    const stopDrawing = (key) => {
        const canvas = canvasRefs.current[key];
        canvas.isDrawing = false;

        canvas.toBlob((blob) => handleChange(key, blob));
    };

    const clearSignature = (key) => {
        const canvas = canvasRefs.current[key];
        const ctx = canvas.getContext("2d");

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        handleChange(key, null);
    };

    const validate = () => {
        const newErrors = {};

        form.fields.forEach((f) => {
            const value = formData[f.key];

            if (
                f.required &&
                (value === "" ||
                    value === null ||
                    (Array.isArray(value) && value.length === 0))
            ) {
                newErrors[f.key] = "Required";
            }
        });

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;

        const formatted = form.fields
            .filter((f) => f.type !== "divider")
            .map((f) => ({
                key: f.label,
                value: formData[f.key],
            }));

        // console.log("Submitted:", formatted);
        const resp = await formsApi.submitResponse(key, formatted)
        if (resp.success) {
            setSubmitted(true);
            return
        }
    };

    if (!form)
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#f5f5f3]">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-ping" />
            </div>
        );

    if (submitted)
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#f5f5f3]">
                <div className="bg-white border border-black/10 rounded-xl p-10 text-center">
                    <div className="w-10 h-10 bg-[#9FE870] text-black rounded-full flex items-center justify-center mx-auto mb-4">
                        ✓
                    </div>
                    <h2 className="text-lg font-semibold text-[#0E0F0C]">
                        Response submitted
                    </h2>
                    <p className="text-sm text-gray-500 mt-1">
                        Thank you for your response.
                    </p>
                </div>
            </div>
        );

    return (
        <div className="min-h-screen bg-[#ffffff] py-10 px-4 flex justify-center">
            <form
                onSubmit={handleSubmit}
                className="w-full max-w-[620px] bg-[#f5f5f3] flex flex-col gap-3 p-[20px] rounded-lg"
            >
                {/* HEADER */}
                <div className="bg-white rounded-xl border border-black/10 overflow-hidden">
                    <div className="h-[6px] bg-[#9FE870]" />

                    <div className="p-5">
                        <p className="text-[11px] uppercase text-gray-400 mb-1">
                            {form.organizationName}
                        </p>

                        <h1 className="text-xl font-semibold text-[#0E0F0C]">
                            {form.name}
                        </h1>

                        {form.description && (
                            <p className="text-[13px] text-gray-500 mt-1">
                                {form.description}
                            </p>
                        )}
                    </div>
                </div>

                {/* FIELDS */}
                {form.fields.map((field) => {
                    if (field.type === "divider") {
                        return (
                            <div
                                key={field.key}
                                className="bg-white rounded-xl border border-black/10 p-4"
                            >
                                <hr className="border-black/10" />
                            </div>
                        );
                    }

                    return (
                        <div
                            key={field.key}
                            className="bg-white rounded-xl border border-black/10 p-4 space-y-2"
                        >
                            <label className="text-[13px] font-medium text-[#0E0F0C]">
                                {field.label}
                                {field.required && (
                                    <span className="text-red-400 ml-1">*</span>
                                )}
                            </label>

                            {/* TEXT INPUT */}
                            {["text", "email", "number", "phone", "date"].includes(field.type) && (
                                <input
                                    type={field.type === "phone" ? "tel" : field.type}
                                    placeholder={field.placeholder}
                                    value={formData[field.key]}
                                    onChange={(e) =>
                                        handleChange(field.key, e.target.value)
                                    }
                                    className={`w-full px-3 py-2 text-[13px] border rounded-md outline-none
                  ${errors[field.key]
                                            ? "border-red-400"
                                            : "border-black/10 focus:border-[#9FE870]"
                                        }`}
                                />
                            )}

                            {/* SELECT */}
                            {field.type === "select" && (
                                <select
                                    value={formData[field.key]}
                                    onChange={(e) =>
                                        handleChange(field.key, e.target.value)
                                    }
                                    className="w-full px-3 py-2 text-[13px] border border-black/10 rounded-md"
                                >
                                    <option value="">
                                        {field.placeholder || "Select"}
                                    </option>
                                    {field.options.map((o) => (
                                        <option key={o.value}>{o.label}</option>
                                    ))}
                                </select>
                            )}

                            {/* CHECKBOX */}
                            {field.type === "checkbox" &&
                                field.options.map((o) => {
                                    const checked =
                                        formData[field.key]?.includes(o.value);
                                    return (
                                        <label
                                            key={o.value}
                                            className="flex items-center gap-2 text-[13px]"
                                        >
                                            <input
                                                type="checkbox"
                                                checked={checked}
                                                onChange={(e) =>
                                                    handleCheckbox(
                                                        field.key,
                                                        o.value,
                                                        e.target.checked
                                                    )
                                                }
                                            />
                                            {o.label}
                                        </label>
                                    );
                                })}

                            {/* RADIO */}
                            {field.type === "radio" &&
                                field.options.map((o) => (
                                    <label
                                        key={o.value}
                                        className="flex items-center gap-2 text-[13px]"
                                    >
                                        <input
                                            type="radio"
                                            name={field.key}
                                            onChange={() =>
                                                handleChange(field.key, o.value)
                                            }
                                        />
                                        {o.label}
                                    </label>
                                ))}

                            {/* RATING */}
                            {field.type === "rating" && (
                                <div>
                                    <div className="flex gap-1 text-[22px]">
                                        {[1, 2, 3, 4, 5].map((s) => (
                                            <span
                                                key={s}
                                                onClick={() => handleChange(field.key, s)}
                                                className={`cursor-pointer transition ${formData[field.key] >= s
                                                    ? "text-yellow-500"
                                                    : "text-gray-300"
                                                    }`}
                                            >
                                                ★
                                            </span>
                                        ))}
                                    </div>
                                    <p className="text-[11px] text-gray-400 mt-1">
                                        {formData[field.key]} / 5
                                    </p>
                                </div>
                            )}

                            {/* SCALE */}
                            {field.type === "scale" && (
                                <div>
                                    <input
                                        type="range"
                                        min="1"
                                        max="10"
                                        value={formData[field.key]}
                                        onChange={(e) =>
                                            handleChange(field.key, Number(e.target.value))
                                        }
                                        className="w-full accent-[#9FE870]"
                                    />
                                    <p className="text-[11px] text-gray-400 mt-1">
                                        {formData[field.key]} / 10
                                    </p>
                                </div>
                            )}

                            {/* FILE */}
                            {field.type === "file" && (
                                <div className="border border-dashed border-black/15 rounded-md p-4 text-center text-[12px] text-gray-400">
                                    <input
                                        type="file"
                                        onChange={(e) =>
                                            handleChange(field.key, e.target.files[0])
                                        }
                                    />
                                </div>
                            )}

                            {/* SIGNATURE */}
                            {field.type === "signature" && (
                                <div className="border border-dashed border-black/15 rounded-md">
                                    <canvas
                                        ref={(el) =>
                                            (canvasRefs.current[field.key] = el)
                                        }
                                        width={500}
                                        height={150}
                                        className="w-full"
                                        onMouseDown={(e) =>
                                            startDrawing(e, field.key)
                                        }
                                        onMouseMove={(e) =>
                                            draw(e, field.key)
                                        }
                                        onMouseUp={() =>
                                            stopDrawing(field.key)
                                        }
                                        onTouchStart={(e) =>
                                            startDrawing(e, field.key)
                                        }
                                        onTouchMove={(e) =>
                                            draw(e, field.key)
                                        }
                                        onTouchEnd={() =>
                                            stopDrawing(field.key)
                                        }
                                    />
                                    <div className="flex justify-between text-[11px] text-gray-400 px-3 py-2">
                                        <span>Draw signature</span>
                                        <button
                                            type="button"
                                            onClick={() =>
                                                clearSignature(field.key)
                                            }
                                            className="text-red-400"
                                        >
                                            Clear
                                        </button>
                                    </div>
                                </div>
                            )}

                            {errors[field.key] && (
                                <p className="text-[11px] text-red-400">
                                    {errors[field.key]}
                                </p>
                            )}
                        </div>
                    );
                })}

                {/* SUBMIT */}
                <button className="w-full py-3 rounded-lg bg-[#9FE870] text-black text-[13px] font-medium hover:opacity-90 transition">
                    Submit
                </button>
            </form>
        </div>
    );
};

export default FormPublic;