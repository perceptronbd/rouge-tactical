import React from "react";
import { cw } from "../../utils";

export const Container = ({ children, className }) => {
  return (
    <div
      className={cw(
        "bg-foreground h-[98vh] w-full flex flex-col gap-5 justify-center items-center rounded-md p-4",
        className
      )}
    >
      {children}
    </div>
  );
};
