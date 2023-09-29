import React from "react";
import { cw } from "../../utils";

export const Button = ({
  variant,
  active = false,
  children,
  className,
  rounded,
  disabled = false,
  icon: Icon,
  ...props
}) => {
  return (
    <button
      className={cw(
        `flex justify-center items-center gap-x-2 px-4 py-2 3xl:p-1 rounded m-0 my-4 h-10 ${className}`,
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
        "font-medium hover:bg-opacity-80 transition-colors duration-300"
      )}
      disabled={disabled}
      {...props}
    >
      {Icon && (
        <span className="flex justify-center items-center">
          <Icon className="w-5 h-5" />
        </span>
      )}
      {children}
    </button>
  );
};
