import React from "react";

export const TabPanel = ({ children, isActive }) => {
  return isActive ? (
    <div className=" h-[94%] flex justify-center items-center">{children}</div>
  ) : null;
};
