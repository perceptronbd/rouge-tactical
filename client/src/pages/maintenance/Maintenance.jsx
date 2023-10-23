import React, { useState } from "react";
import { MdNotificationImportant, MdPlaylistAdd } from "react-icons/md";
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
import { adminFormInputs } from "./adminFormInputs";

export const Maintenance = () => {
  const [showModal, setShowModal] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [showAdminForm, setShowAdminForm] = useState(false);
  const [maintenanceDetails, setMaintenanceDetails] = useState({});

  const openForm = () => {
    setShowForm(true);
  };
  const openAdminForm = () => {
    setShowAdminForm(true);
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
        <div className="flex gap-2">
          <Button icon={MdPlaylistAdd} onClick={openForm}>
            Add New
          </Button>
          <Button
            icon={MdNotificationImportant}
            variant={"highlight"}
            onClick={openAdminForm}
          >
            Notify Admin
          </Button>
        </div>
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
      <ContentModal isOpen={showAdminForm} setShowModal={setShowAdminForm}>
        <Form
          formTitle={"Notify Admin"}
          inputFields={adminFormInputs}
          handleChange={handleChange}
          onSubmit={onSubmit}
        />
      </ContentModal>
    </Container>
  );
};
