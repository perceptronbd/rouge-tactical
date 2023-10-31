import React, { useEffect } from "react";
import { Container, ContentModal, UpdateForm } from "../../components";
import { Table } from "./Table";
import { productionData } from "../../mock/production";
import { productionInputs } from "./productionInputs";
import { OnboardingDoc } from "./OnboardingDoc";

export const Production = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [showForm, setShowForm] = React.useState(false);
  const [itemData, setItemData] = React.useState({});

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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(itemData);
  };

  return (
    <Container>
      <section className="w-full h-[540px]">
        <Table
          data={productionData}
          loading={isLoading}
          setShowForm={setShowForm}
          setItemData={setItemData}
        />
        <ContentModal isOpen={showForm} setShowModal={setShowForm}>
          <UpdateForm
            formTitle={"Update"}
            inputFields={productionInputs}
            data={itemData}
            handleChange={handleItemData}
            onSubmit={handleSubmit}
          />
        </ContentModal>
      </section>
      <section className="w-full h-full">
        <OnboardingDoc role={"admin"} />
      </section>
    </Container>
  );
};
