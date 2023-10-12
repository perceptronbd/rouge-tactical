import React from "react";
import { AiOutlineClose } from "react-icons/ai";

export const ContentModal = ({ isOpen, setShowModal, children }) => {
  if (!isOpen) return null;

  const handleClick = () => {
    setShowModal(false);
  };

  return (
    <section className="bg-accent-secondary bg-opacity-20 fixed inset-0 flex items-center justify-center z-50 transition-all ease-in-out duration-300">
      <div className="bg-white rounded-lg shadow-lg p-2 w-fit">
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
          {children}
        </div>
      </div>
    </section>
  );
};
