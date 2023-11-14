import React from "react";
import { cw } from "../../utils";

export const Checkbox = (props) => {
  const { id, label, className, ...inputProps } = props;

  return (
    <>
      <div className={cw("py-1", className)}>
        <input
          className="peer appearance-none h-4 w-4 border-2 border-accent-tertiary rounded bg-transparent checked:bg-accent-tertiary checked:border-accent-tertiary focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
          type="checkbox"
          id={id}
          {...inputProps}
        />
        <label
          className="inline-block peer-checked:text-accent-tertiary peer-checked:font-semibold transition-all ease-in-out duration-300"
          htmlFor={id}
        >
          {label}
        </label>
      </div>
    </>
  );
};
