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
import { useModal } from "../../hooks";

export const Maintenance = () => {
  const [maintenanceDetails, setMaintenanceDetails] = useState({});

  const {
    showModal: showForm,
    openModal: openForm,
    closeModal: closeForm,
  } = useModal();
  const {
    showModal: showUpdateForm,
    openModal: openUpdateForm,
    closeModal: closeUpdateForm,
  } = useModal();

  const {
    showModal: showAdminForm,
    openModal: openAdminForm,
    closeModal: closeAdminForm,
  } = useModal();

  const openFormModal = () => {
    openForm();
  };
  const openAdminFormModal = () => {
    openAdminForm();
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
          openUpdateForm={openUpdateForm}
          setMaintenanceDetails={setMaintenanceDetails}
        />
        <div className="flex gap-2">
          <Button icon={MdPlaylistAdd} onClick={openFormModal}>
            Add New
          </Button>
          <Button
            icon={MdNotificationImportant}
            variant={"highlight"}
            onClick={openAdminFormModal}
          >
            Notify Admin
          </Button>
        </div>
      </section>
      <ContentModal isOpen={showUpdateForm} closeModal={closeUpdateForm}>
        <UpdateForm
          formTitle={"Update Maintenance"}
          inputFields={maintenanceInputs}
          data={maintenanceDetails}
          handleChange={handleChange}
          onSubmit={onSubmit}
        />
      </ContentModal>
      <ContentModal isOpen={showForm} closeModal={closeForm}>
        <Form
          formTitle={"Add Maintenance"}
          inputFields={maintenanceInputs}
          handleChange={handleChange}
          onSubmit={onSubmit}
        />
      </ContentModal>
      <ContentModal isOpen={showAdminForm} closeModal={closeAdminForm}>
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
