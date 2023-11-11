import React from "react";
import { AiOutlineClose, AiOutlineCloseCircle } from "react-icons/ai";
import { BiCheckCircle } from "react-icons/bi";

export const Modal = ({ isOpen, closeModal, modalMessage, isError }) => {
  if (!isOpen) return null;

  const handleClick = () => {
    closeModal();
  };

  return (
    <section className="bg-accent-secondary bg-opacity-20 fixed inset-0 flex items-center justify-center z-50 transition-all ease-in-out duration-300">
      <div className="bg-white rounded-lg shadow-lg p-2 max-w-md">
        <div className="w-full flex justify-end">
          <button
            onClick={handleClick}
            className={
              "group w-4 h-4 bg-background hover:bg-red-500 flex items-center justify-center rounded transition-all ease-in-out duration-300"
            }
          >
            <AiOutlineClose className="group-hover:text-white text-textColor w-3 h-3" />
          </button>
        </div>
        <div className="p-4 flex items-center justify-center gap-2">
          {isError ? (
            <AiOutlineCloseCircle className="text-red-500 w-8 h-8 mx-auto" />
          ) : (
            <BiCheckCircle className="text-green-500 w-8 h-8 mx-auto" />
          )}
          {modalMessage}
        </div>
      </div>
    </section>
  );
};
