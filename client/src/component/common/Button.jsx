import React from "react";

const Button = ({
  children,
  onClick,
  type = "button",
  variant = "primary",
  size = "md",
  icon: Icon,
  iconPosition = "left",
  disabled = false,
  className = "",
}) => {
  const baseClass =
    "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-150 ease-in-out whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";

  const variantClass = {
    primary:
      "bg-lime-300 text-green-950 hover:bg-lime-200 focus:ring-lime-300",
    secondary:
      "bg-white/10 text-white border border-white/20 hover:bg-white/20 focus:ring-white/30",
    tertiary:
      "bg-transparent text-green-950 border border-black/15 hover:bg-green-950/5 focus:ring-green-900/20",
    danger:
      "bg-red-50 text-red-700 border border-red-200 hover:bg-red-100 focus:ring-red-300",
    minimal:
      "bg-transparent text-green-950 hover:bg-green-950/5 focus:ring-green-900/20",
  };

  const sizeClass = {
    sm: "h-8 px-4 text-xs",
    md: "h-10 px-5 text-sm",
    lg: "h-11 px-6 text-sm",
    icon: "h-10 w-10 p-0",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClass} ${variantClass[variant]} ${sizeClass[size]} ${className}`}
    >
      {Icon && iconPosition === "left" && <Icon size={16} />}
      {size !== "icon" && <span>{children}</span>}
      {Icon && iconPosition === "right" && size !== "icon" && <Icon size={16} />}
      {Icon && size === "icon" && <Icon size={16} />}
    </button>
  );
};

export default Button;