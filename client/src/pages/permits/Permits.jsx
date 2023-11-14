import React, { useState } from "react";
import { Table } from "./Table";
import { permitsData } from "../../mock/permits";
import {
  Button,
  ContentModal,
  Modal,
  UpdateForm,
  Form,
} from "../../components";
import { permitsInput } from "./permitsInput";
import { MdPostAdd } from "react-icons/md";
import { useModal } from "../../hooks";

export const Permits = () => {
  //data states
  const [permitsDetails, setPermitsDetails] = useState(null);
  //modal states
  const { showModal, isError, modalMessage, openModal, closeModal } =
    useModal();
  const {
    showModal: showPermits,
    openModal: openPermits,
    closeModal: closePermits,
  } = useModal();
  const {
    showModal: showEditForm,
    openModal: openEditForm,
    closeModal: closeEditForm,
  } = useModal();

  const handleChange = (e) => {
    console.log(e.target.value);
    setPermitsDetails({ ...permitsDetails, [e.target.name]: e.target.value });
  };

  const openPermitsFrom = () => {
    openPermits();
  };

  const onSubmit = (e) => {
    e.preventDefault();
    openModal("Process Successfull!", false);
  };

  return (
    <section className={"w-full p-2 h-full bg-foreground rounded-xl"}>
      <ContentModal isOpen={showPermits} closeModal={closePermits}>
        <Form
          formTitle={"Add Permit"}
          inputFields={permitsInput}
          handleChange={handleChange}
          onSubmit={onSubmit}
        />
      </ContentModal>
      <ContentModal isOpen={showEditForm} closeModal={closeEditForm}>
        <UpdateForm
          formTitle={"Update Permit"}
          inputFields={permitsInput}
          data={permitsDetails}
          handleChange={handleChange}
          onSubmit={onSubmit}
        />
      </ContentModal>
      <Modal
        isOpen={showModal}
        closeModal={closeModal}
        modalMessage={modalMessage}
        isError={isError}
      />
      <div>
        <Table
          data={permitsData}
          openEditForm={openEditForm}
          setPermitDetails={setPermitsDetails}
        />
      </div>
      <Button
        icon={MdPostAdd}
        className={"my-2 3xl:my-4"}
        onClick={openPermitsFrom}
      >
        New Permits
      </Button>
    </section>
  );
};
