import React from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { Button } from "../buttons/Button";

export const IncDecNum = (props) => {
  const { name, value, onChange } = props;

  let incNum = () => {
    if (value < 10) {
      onChange(value + 1);
    }
  };
  let decNum = () => {
    if (value > 0) {
      onChange(value - 1);
    }
  };

  return (
    <div className="flex items-center my-2">
      {props.label ? (
        <label className="font-medium mb-2 mr-2 text-textColor-light">
          {props.label}
        </label>
      ) : (
        ""
      )}
      <div className="flex items-center">
        <Button
          className="bg-background flex items-center justify-center p-3 w-6 h-6 rounded-md border-textColor-light border hover:bg-accent-secondary hover:bg-opacity-40 hover:text-white transition-all ease-in-out duration-300"
          type="button"
          variant={"ghost"}
          onClick={decNum}
          icon={AiOutlineMinus}
        />
        <input
          name={name}
          type="text"
          className="w-10 bg-background rounded-md m-2 p-1 text-center"
          value={value}
          onChange={onChange}
        />

        <Button
          className="bg-background flex items-center justify-center p-3 w-6 h-6 rounded-md border-textColor-light border hover:bg-accent-secondary hover:bg-opacity-40 hover:text-white transition-all ease-in-out duration-300"
          type="button"
          variant={"ghost"}
          onClick={incNum}
          icon={AiOutlinePlus}
        />
      </div>
    </div>
  );
};
