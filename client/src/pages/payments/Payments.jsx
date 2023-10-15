import React, { useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { Button, Container, PieGraph, SelectInput } from "../../components";
import { serviceGraph, services } from "../../mock/service";
import { Table } from "./Table";

export const Payments = () => {
  const [data, setData] = useState(services);
  const [disable, setDisable] = useState(false);

  const filterOpts = [
    { id: "7 days", name: "7 days" },
    { id: "14 days", name: "14 days" },
    { id: "1 month", name: "1 month" },
    { id: "3 months", name: "3 months" },
    { id: "6 months", name: "6 months" },
    { id: "1 year", name: "1 year" },
  ];

  const handleFilter = (e) => {
    console.log(e.target.value);
  };

  const handleEdit = (id) => {
    setData((prevData) =>
      prevData.map((item) =>
        item.id === id ? { ...item, isEditing: !item.isEditing } : item
      )
    );
    setDisable(!disable);
    console.log(disable);
  };
  const handleDelete = (id) => {
    setData((prevData) => prevData.filter((item) => item.id !== id));
  };

  const handleEditData = (id, e) => {
    console.log(id, e.target.value, e.target.name);
    setData((prevData) =>
      prevData.map((item) => {
        if (item.id === id) {
          return { ...item, [e.target.name]: e.target.value };
        }
        return item;
      })
    );

    console.log(data);
  };

  const handleSubmit = (id) => {
    const updatedItem = data.find((item) => item.id === id);
    // Check if the item is edited and then submit it
    if (updatedItem.isEditing) {
      // Perform your submission logic here
      console.log("Submit item:", updatedItem);
    }
    setDisable(!disable);
    // Reset the isEditing and isEdited flags
    setData((prevData) =>
      prevData.map((item) => {
        if (item.id === id) {
          return { ...item, isEditing: false };
        }
        return item;
      })
    );
  };

  return (
    <Container>
      <section className="border rounded-md w-full h-[300px] 3xl:h-[450px] p-2 flex justify-between">
        <div>
          <SelectInput
            id={"filter"}
            label={"filter"}
            name={"filter"}
            selectOpts={filterOpts}
            onChange={handleFilter}
          />
          <PieGraph data={serviceGraph} />
        </div>
        <article className="w-[60%] h-full">
          <Table
            data={data}
            handleEdit={handleEdit}
            handleEditData={handleEditData}
            handleSubmit={handleSubmit}
            disabled={disable}
            handleDelete={handleDelete}
          />
          <Button className={"w-full"} icon={AiOutlinePlus} variant={"ghost"}>
            Add Service
          </Button>
        </article>
      </section>
    </Container>
  );
};
