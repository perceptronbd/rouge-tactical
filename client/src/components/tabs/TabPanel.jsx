import React from "react";

export const TabPanel = ({ children, isActive }) => {
  return isActive ? (
    <div className="bg-foreground h-[94%] flex justify-center items-center">
      {children}
    </div>
  ) : null;
};
