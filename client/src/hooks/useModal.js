import { useState } from "react";

export const useModal = () => {
  const [showModal, setShowModal] = useState(false);
  const [isError, setIsError] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const openModal = (message, error = false) => {
    setShowModal(true);
    setIsError(error);
    setModalMessage(message);
  };

  const closeModal = () => {
    setShowModal(false);
    setIsError(false);
    setModalMessage("");
  };

  return {
    showModal,
    isError,
    modalMessage,
    openModal,
    closeModal,
  };
};
