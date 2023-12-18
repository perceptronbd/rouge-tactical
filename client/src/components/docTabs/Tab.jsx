import React from "react";
import { cw } from "../../utils";

export const Tab = ({ icon: Icon, label, isActive, onClick }) => {
  return (
    <button
      className={cw(
        "flex justify-center items-center gap-4 text-textColor-light font-semibold px-3 py-1 rounded-md text-sm focus:outline-none transition-all ease-in-out duration-300",
        isActive
          ? "bg-accent-tertiary text-white hover:text-accent-hover"
          : "bg-opacity-0 !bg-gray-200 hover:bg-gray-300"
      )}
      onClick={onClick}
    >
      {Icon && <Icon />}
      {label}
    </button>
  );
};
