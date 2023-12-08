import React, { useEffect } from "react";
import { createProduction } from "../../api";
import {
  Button,
  Container,
  ContentModal,
  Form,
  Modal,
  UpdateForm,
} from "../../components";
import { useModal } from "../../hooks";
import { productionData } from "../../mock/production";
import { OnboardingDoc } from "./OnboardingDoc";
import { Table } from "./Table";
import { productionInputs } from "./productionInputs";

export const Production = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [itemData, setItemData] = React.useState({});

  const { showModal, isError, modalMessage, openModal, closeModal } =
    useModal();
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

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  });

  const handleItemData = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    const updatedItemData = { ...itemData };

    // Split the name into nested property parts
    const propertyPath = name.split(".");

    console.log(propertyPath);

    // If it's a nested property, update it accordingly
    if (propertyPath.length === 2) {
      updatedItemData[propertyPath[0]] = {
        ...updatedItemData[propertyPath[0]],
        [propertyPath[1]]: value,
      };
    } else {
      updatedItemData[name] = value;
    }

    setItemData(updatedItemData);
  };

  const handleOpenForm = () => {
    openForm();
  };

  const handleAddItem = async (e) => {
    e.preventDefault();
    try {
      console.log(itemData);
      createProduction(itemData).then((res) => {
        console.log(res);
        const code = res.status;
        const message = res.data.message;
        if (code === 200) {
          openModal(message, false);
        } else {
          openModal(message, true);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container>
      <section className="w-full h-[260px]">
        <Table
          data={productionData}
          loading={isLoading}
          openUpdateForm={openUpdateForm}
          setItemData={setItemData}
        />
        <ContentModal
          isOpen={showUpdateForm}
          closeModal={closeUpdateForm}
        >
          <UpdateForm
            formTitle={"Update"}
            inputFields={productionInputs}
            data={itemData}
            handleChange={handleItemData}
            onSubmit={handleAddItem}
          />
        </ContentModal>
        <ContentModal
          isOpen={showForm}
          closeModal={closeForm}
        >
          <Form
            formTitle={"Add Item"}
            inputFields={productionInputs}
            handleChange={handleItemData}
            onSubmit={handleAddItem}
          />
        </ContentModal>
      </section>
      <section className="w-full">
        <Button
          className={"m-0"}
          onClick={handleOpenForm}
        >
          Add Item
        </Button>
      </section>
      <section className="w-full h-full">
        <OnboardingDoc role={"admin"} />
      </section>
      <Modal
        isOpen={showModal}
        closeModal={closeModal}
        modalMessage={modalMessage}
        isError={isError}
      />
    </Container>
  );
};
