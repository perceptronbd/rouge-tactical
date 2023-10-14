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

export const Permits = () => {
  //data states
  const [permitsDetails, setPermitsDetails] = useState(null);
  //modal states
  const [showPermitsForm, setShowPermitsForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const handleChange = (e) => {
    console.log(e.target.value);
    setPermitsDetails({ ...permitsDetails, [e.target.name]: e.target.value });
  };

  const openPermitsFrom = () => {
    setShowPermitsForm(true);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setShowModal(true);
    setModalMessage("Process Successfull!");
    setIsError(false);
    console.log(permitsDetails);
  };

  return (
    <section className={"w-full p-2 h-full bg-foreground rounded-xl"}>
      <ContentModal isOpen={showPermitsForm} setShowModal={setShowPermitsForm}>
        <Form
          formTitle={"Add Permit"}
          inputFields={permitsInput}
          handleChange={handleChange}
          onSubmit={onSubmit}
        />
      </ContentModal>
      <ContentModal isOpen={showEditForm} setShowModal={setShowEditForm}>
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
        setShowModal={setShowModal}
        message={modalMessage}
        isError={isError}
      />
      <div className="h-[605px] 3xl:h-[960px]">
        <Table
          data={permitsData}
          setShowForm={setShowEditForm}
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
