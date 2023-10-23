import React from "react";
import { ImSpinner2 } from "react-icons/im";

export const LoaderCard = () => {
  return (
    <div className="w-full h-full flex justify-center items-center animate-pulse bg-neutral-200 rounded-md">
      <ImSpinner2
        size={"2rem"}
        className="text-neutral-500 animate-spin duration-75"
      />
    </div>
  );
};
