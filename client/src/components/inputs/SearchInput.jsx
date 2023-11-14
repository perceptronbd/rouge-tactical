import React from "react";
import { cw } from "../../utils";

export const SearchInput = (props) => {
  const { onChange, searchQuery, className } = props;

  return (
    <>
      <div className="relative w-72 rt-sm:w-60 bg-background rounded">
        <label for="search" className="flex items-center w-full h-10">
          <input
            autocomplete="off"
            placeholder="Search..."
            id="search"
            type="text"
            className={cw(
              "w-full ps-[3.5em] outline-none bg-transparent",
              className
            )}
            value={searchQuery}
            onChange={onChange}
          />
          <div className="group: absolute pl-6 transition ease-in-out duration-300 flex justify-center items-center ">
            <svg
              stroke-width="2"
              stroke="currentColor"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="swap-on absolute h-6 text-textColor transition ease-in-out duration-300"
            >
              <path
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                stroke-linejoin="round"
                stroke-linecap="round"
              ></path>
            </svg>
          </div>
        </label>
      </div>
    </>
  );
};
