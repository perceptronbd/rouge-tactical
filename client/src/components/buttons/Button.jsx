import React from "react";
import { cw } from "../../utils";

export const Button = ({
  variant,
  active = false,
  children,
  className,
  rounded,
  disabled = false,
  ...props
}) => {
  return (
    <button
      className={cw(
        `px-4 py-2 rounded m-0 my-6 h-10 ${className}`,
        {
          "bg-accent-tertiary text-white": variant === "default" || !variant,
          "bg-yellow-500 text-black": variant === "warning",
          "bg-red-500 text-white": variant === "danger",
          "bg-green-500 text-white": variant === "success",
          "bg-accent-secondary text-accent-primary": variant === "highlight",
          "bg-backgroundColor-secondary text-gray-500 hover:bg-gray-100 hover:text-gray-800":
            variant === "ghost",
          "text-accent-secondary border border-accent-secondary hover:bg-accent-secondary hover:text-accent-primary":
            variant === "ghost",

          "bg-background text-textColor-secondary cursor-not-allowed":
            variant === "disabled" || disabled,
        },
        "hover:bg-opacity-80 transition-colors duration-300"
      )}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};
