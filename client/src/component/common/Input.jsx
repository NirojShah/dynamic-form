import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

const Input = ({
  label,
  name,
  type = "text",
  value,
  onChange,
  placeholder = "Type here",
  required = false,
  disabled = false,
  error = "",
  helperText = "",
  icon: Icon,
  className = "",
  inputClassName = "",
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = type === "password";

  return (
    <div className={`w-full font-['Inter',sans-serif] ${className}`}>
      {label && (
        <label
          htmlFor={name}
          className="mb-1.5 flex items-center gap-1 text-sm font-semibold text-[#0E0F0C]"
        >
          <span>{label}</span>
          {required && <span className="text-[#A8200D]">*</span>}
        </label>
      )}

      {helperText && !error && (
        <p className="mb-2 text-xs text-[#6A6C6A]">{helperText}</p>
      )}

      <div className="flex items-center gap-2 border-b border-black/20 bg-transparent">
        {Icon && <Icon size={16} className="shrink-0 text-[#6A6C6A]" />}

        <input
          id={name}
          name={name}
          type={isPassword ? (showPassword ? "text" : "password") : type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
          className={`w-full bg-transparent py-2 text-sm text-[#0E0F0C] placeholder:text-[#6A6C6A] outline-none disabled:cursor-not-allowed disabled:opacity-50 ${
            error ? "border-[#A8200D]" : ""
          } ${inputClassName}`}
        />

        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="text-[#6A6C6A] hover:text-black"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}
      </div>

      {error && <p className="mt-2 text-xs text-[#A8200D]">{error}</p>}
    </div>
  );
};

export default Input;