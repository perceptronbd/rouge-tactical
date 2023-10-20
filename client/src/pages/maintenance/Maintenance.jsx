import React, { useState } from "react";
import { MdPlaylistAdd } from "react-icons/md";
import {
  Button,
  Container,
  ContentModal,
  UpdateForm,
  Form,
} from "../../components";
import { Table } from "./Table";
import { maintenanceData } from "../../mock/maintenance";
import { maintenanceInputs } from "./maintenanceInputs";

export const Maintenance = () => {
  const [showModal, setShowModal] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [maintenanceDetails, setMaintenanceDetails] = useState({});

  const openForm = () => {
    setShowForm(true);
  };

  const handleChange = (e) => {
    console.log(e.target.value);
    setMaintenanceDetails({
      ...maintenanceDetails,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log("submit");
  };

  return (
    <Container>
      <section className="w-full">
        <Table
          data={maintenanceData}
          setShowForm={setShowModal}
          setMaintenanceDetails={setMaintenanceDetails}
        />
        <Button icon={MdPlaylistAdd} onClick={openForm}>
          Add New
        </Button>
      </section>
      <ContentModal isOpen={showModal} setShowModal={setShowModal}>
        <UpdateForm
          formTitle={"Update Maintenance"}
          inputFields={maintenanceInputs}
          data={maintenanceDetails}
          handleChange={handleChange}
          onSubmit={onSubmit}
        />
      </ContentModal>
      <ContentModal isOpen={showForm} setShowModal={setShowForm}>
        <Form
          formTitle={"Add Maintenance"}
          inputFields={maintenanceInputs}
          handleChange={handleChange}
          onSubmit={onSubmit}
        />
      </ContentModal>
    </Container>
  );
};
