import React from "react";

export const Separator = ({ direction }) => {
  if (direction === "vertical") {
    return <span className="border h-full rounded-full" />;
  }
  return <span className="border w-full rounded-full" />;
};
