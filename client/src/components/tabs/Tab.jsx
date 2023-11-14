import React from "react";
import { cw } from "../../utils";

export const Tab = ({ icon: Icon, label, isActive, onClick }) => {
  return (
    <button
      className={cw(
        "flex justify-center items-center gap-4 text-textColor-light font-semibold px-4 py-2 rounded-t focus:outline-none hover:bg-gray-200 transition-all ease-in-out duration-300 rt-sm:text-xs",
        isActive
          ? "bg-foreground text-accent-tertiary hover:text-accent-hover"
          : "bg-opacity-0"
      )}
      onClick={onClick}
    >
      {Icon && <Icon />}
      {label}
    </button>
  );
};
