import React, { useState } from "react";
import { cw } from "../../utils";

export const Dropdown = (props) => {
  const {
    id,
    name,
    label,
    className,
    errorMessage,
    options,
    selectedValue,
    onChange,
  } = props;

  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (value) => {
    onChange(value);
    setIsOpen(false);
  };

  return (
    <div className="relative my-2">
      <div
        onClick={toggleDropdown}
        className={cw(
          "peer block border rounded-lg w-72 p-2 focus:outline-none focus:ring-1 focus:border-accent-tertiary cursor-pointer",
          className
        )}
      >
        {selectedValue || `Select ${label}`}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`h-5 w-5 absolute right-3 top-6 transition-transform transform ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>

      {isOpen && (
        <div className="absolute mt-1 w-72 rounded-lg bg-white border border-gray-300 shadow-lg">
          <ul className="py-1">
            {options.map((option) => (
              <li
                key={option.value}
                onClick={() => handleOptionClick(option.value)}
                className="cursor-pointer px-4 py-2 hover:bg-gray-100"
              >
                {option.label}
              </li>
            ))}
          </ul>
        </div>
      )}

      {label && (
        <label
          htmlFor={id}
          className="absolute text-sm px-1 text-gray-500 duration-300 transform -translate-y-3 bg-foreground scale-75 top-4 z-10 origin-[0] left-2.5"
        >
          {label}
        </label>
      )}

      <span className="text-red-500 hidden peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
        {errorMessage}
      </span>
    </div>
  );
};
