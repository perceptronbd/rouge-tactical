import React, { useState } from "react";
import { Container, ContentModal, UpdateForm } from "../../components";
import { Table } from "./Table";
import { maintenanceData } from "../../mock/maintenance";
import { maintenanceInputs } from "./maintenanceInputs";

export const Maintenance = () => {
  const [showModal, setShowModal] = useState(false);
  const [maintenanceDetails, setMaintenanceDetails] = useState({});

  const handleChange = (e) => {
    console.log(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log("submit");
  };

  return (
    <Container>
      <section>
        <Table
          data={maintenanceData}
          setShowForm={setShowModal}
          setMaintenanceDetails={setMaintenanceDetails}
        />
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
    </Container>
  );
};
