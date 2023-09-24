import React from "react";

export const Container = ({ children }) => {
  return (
    <div className="bg-foreground h-[97vh] 3xl:h-[98vh] flex flex-col gap-5 justify-center items-center rounded-md p-4">
      {children}
    </div>
  );
};
