import React from "react";

export const CheckBox = (props) => {
  const { id, label, ...inputProps } = props;

  return (
    <>
      <div className="py-1">
        <input
          className="appearance-none h-4 w-4 border-2 border-accent-tertiary rounded bg-transparent checked:bg-accent-tertiary checked:border-accent-tertiary focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
          type="checkbox"
          id={id}
          {...inputProps}
        />
        <label className="inline-block" htmlFor={id}>
          {label}
        </label>
      </div>
    </>
  );
};
